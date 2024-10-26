'use client';

import { db } from "@/app/firebase";
import { doc, updateDoc, arrayUnion, getDocs, query, collection, where } from "firebase/firestore";

const FriendsCard = ({ user }) => {
    const { name, email, image } = user; // Assuming each user has these properties
    const userSession = JSON.parse(sessionStorage.getItem('user'))

    console.log(session)

    const handleAddFriend = async () => {
        try {
            // Step 1: Find the current user by session email
            const userQuery = query(
                collection(db, 'users'),
                where('email', '==', userSession.email)
            );

            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                const currentUserDoc = querySnapshot.docs[0]; // Get the current user document
                const currentUserRef = doc(db, 'users', currentUserDoc.id);

                // Step 2: Add the friend's email to the current user's friends array
                await updateDoc(currentUserRef, {
                    friends: arrayUnion(email), // Add friend's email to the array
                });

                alert(`${name} added as a friend!`);
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <div className="w-full border-[1px] shadow-md min-w-[200px] h-[376px] rounded-xl bg-white text-black font-semibold flex flex-col">
            {/* Image section */}
            <div
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                }}
                className="h-[200px] w-full"
            />

            {/* Content section */}
            <div className="p-3 flex flex-1 flex-col justify-between">
                <p>{name}</p>

                <div className="flex flex-col gap-2 mt-auto">
                    <button className="bg-blue-50 text-blue-600 py-2 rounded-md" onClick={handleAddFriend}>
                        Add friend
                    </button>
                    <button className="bg-gray-200 py-2 rounded-md">Remove</button>
                </div>
            </div>
        </div>
    );
};

export default FriendsCard;
