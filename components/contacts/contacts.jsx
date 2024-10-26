'use client';

import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { Icons } from "@/icons/icons";
import SkeletonContactUser from "../skeleton/contact_user";
import Image from "next/image";
import { user } from "@/constants/data";

const Contacts = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    // Step 1: Fetch the current user's friends by email
    useEffect(() => {
        const fetchFriends = async () => {
            if (!user) return;

            try {
                const userQuery = query(
                    collection(db, 'users'),
                    where('email', '==', user.email)
                );

                const querySnapshot = await getDocs(userQuery);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0].data();
                    const friendsEmails = userDoc.friends || []; // Get friends' emails

                    // Step 2: Query Firestore for friends' data by their emails
                    const friendsQuery = query(
                        collection(db, 'users'),
                        where('email', 'in', friendsEmails) // Query friends by email
                    );

                    const friendsSnapshot = await getDocs(friendsQuery);
                    const friendsData = friendsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setFriends(friendsData); // Store friends in state
                }
            } catch (error) {
                console.error("Error fetching friends:", error);
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchFriends();
    }, []);
    
    return (
        <div className="hidden lg:inline-block lg:w-[280px] lg:min-w-[280px] p-4 rounded-lg">
            <div className="flex justify-between">
                <h2 className="text-lg font-medium mb-4 text-gray-500">Contacts</h2>
                <div className="contacts-functions h-5 gap-2 text-gray-500 flex">
                    <div className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 flex justify-center items-center">
                        <Icons.Search className="w-5 h-5 "/>
                    </div>
                    <div className="w-8 h-8 cursor-pointer rounded-full hover:bg-gray-200 flex justify-center items-center">
                        <Icons.MoreEllipsisHorizontal className="w-5 h-5"/>
                    </div>
                </div>
            </div>
            <ul className="">
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <SkeletonContactUser key={index} />
                    )) // Show skeletons while loading
                ) : (
                    friends.map((friend) => (
                        <li key={friend.id} className="flex items-center gap-3 hover:bg-gray-200 rounded-lg cursor-pointer p-2">
                            <div className="w-10 h-10 relative">
                                <Image
                                    src={friend.image}
                                    alt={friend.name}
                                    className="w-full h-full absolute rounded-full object-cover"
                                    width={0}
                                    height={0}
                                />
                                {friend.active && (
                                    <div className="bottom-0 right-0 absolute w-[12px] h-[12px] bg-green-600 border-[2px] rounded-full border-white"></div>
                                )}
                            </div>
                            <p className="text-[1rem] font-medium">{friend.name}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Contacts;
