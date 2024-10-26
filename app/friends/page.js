'use client';

import SideBar from "@/components/side_bar/friends/side_bar";
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "@/app/firebase";
import FriendsCard from "@/components/cards/friends/friends_card";
import { useEffect, useState } from "react";

export default function Friends() {
    const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered users
    const [currentUserFriends, setCurrentUserFriends] = useState([]); // State to store current user's friends
    const [realtimeUsers] = useCollection(query(collection(db, 'users'))); // Get all users
    const [userSession, setUserSession] = useState(null)

    useEffect(() => {
        setUserSession(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    if(!userSession) {
        return (<div>Loading...</div>)
    }

    // Step 1: Fetch the current user’s friends when the component mounts
    useEffect(() => {
        const fetchCurrentUserFriends = async () => {
            if (!userSession) return;

            // Query to find the current user based on session email
            const currentUserQuery = query(
                collection(db, 'users'),
                where('email', '==', userSession.email)
            );

            const querySnapshot = await getDocs(currentUserQuery);
            if (!querySnapshot.empty) {
                const currentUserData = querySnapshot.docs[0].data();
                setCurrentUserFriends(currentUserData.friends || []); // Store friends' emails
            }
        };

        fetchCurrentUserFriends();
    }, []);

    // Step 2: Filter out users who are already friends
    useEffect(() => {
        if (realtimeUsers) {
            const users = realtimeUsers.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((user) => user.email !== userSession.email) // Exclude the current user
                .filter((user) => !currentUserFriends.includes(user.email)); // Exclude existing friends

            setFilteredUsers(users); // Set the filtered list
        }
    }, [realtimeUsers, currentUserFriends]);

    // Function to handle adding a friend by email
    const handleAddFriend = async (friendEmail) => {
        if (!userSession) return;

        const currentUserQuery = query(
            collection(db, 'users'),
            where('email', '==', userSession.email)
        );

        const querySnapshot = await getDocs(currentUserQuery);
        if (querySnapshot.empty) return;

        const currentUserDoc = querySnapshot.docs[0];
        const currentUserId = currentUserDoc.id;

        // Add the friend's email to the friends array in Firestore
        await updateDoc(doc(db, 'users', currentUserId), {
            friends: arrayUnion(friendEmail),
        });

        // Remove the added friend from the suggestions list
        setFilteredUsers((prev) =>
            prev.filter((user) => user.email !== friendEmail) // Filter out the added friend
        );

        // Optionally: Update currentUserFriends to reflect the added friend
        setCurrentUserFriends((prev) => [...prev, friendEmail]);
    };

    return (
        <div className="h-[100vh] flex gap-8">
            <SideBar />
            <div className="pt-10 pr-8 grow">
                {/* Title */}
                <div className="friends-header flex justify-between mb-5">
                    <p className="text-[1.3rem] font-bold">People you may know</p>
                    <p className="text-blue-600">See all</p>
                </div>

                {/* Friends cards */}
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    }}
                >
                    {filteredUsers.map((user) => (
                        <FriendsCard
                            key={user.id}
                            user={user}
                            onAddFriend={handleAddFriend} // Pass the add friend handler
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
