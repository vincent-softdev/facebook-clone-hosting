'use client';

import SideBar from "@/components/side_bar/friends/side_bar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "@/app/firebase";
import FriendsCard from "@/components/cards/friends/friends_card";
import SkeletonFriendsCard from "@/components/skeleton/friend_card";
import { useEffect, useState } from "react";
import { user } from "@/constants/data";

export default function Friends() {
    const [filteredUsers, setFilteredUsers] = useState([]); // Hold filtered users
    const [currentUserFriends, setCurrentUserFriends] = useState([]); // Store current user's friends
    const [loading, setLoading] = useState(true); // Manage loading state
    const [realtimeUsers] = useCollection(query(collection(db, 'users'))); // Fetch all users
    const userSession = user; // Current user session

    // Step 1: Fetch the current user's friends when the component mounts
    useEffect(() => {
        const fetchCurrentUserFriends = async () => {
            if (!userSession) return;

            const currentUserQuery = query(
                collection(db, 'users'),
                where('email', '==', userSession.email)
            );

            const querySnapshot = await getDocs(currentUserQuery);
            if (!querySnapshot.empty) {
                const currentUserData = querySnapshot.docs[0].data();
                setCurrentUserFriends(currentUserData.friends || []); // Store friends' emails
            }
            setLoading(false); // Stop loading when done
        };

        fetchCurrentUserFriends();
    }, [userSession]);

    // Step 2: Filter out users who are already friends and the current user
    useEffect(() => {
        if (realtimeUsers) {
            const users = realtimeUsers.docs
                .map((doc) => ({ id: doc.id, ...doc.data() })) // Map Firestore data
                .filter(
                    (_user) =>
                        _user.email !== userSession.email && // Exclude current user
                        !currentUserFriends.includes(_user.email) // Exclude existing friends
                );

            setFilteredUsers(users); // Set the filtered list
        }
    }, [realtimeUsers, currentUserFriends, userSession]);

    return (
        <div className="h-[100vh] flex gap-8">
            <SideBar />
            <div className="pt-10 pr-8 grow">
                {/* Header */}
                <div className="friends-header flex justify-between mb-5">
                    <p className="text-[1.3rem] font-bold">People you may know</p>
                    <p className="text-blue-600">See all</p>
                </div>

                {/* Friends Cards */}
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    }}
                >
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonFriendsCard key={index} />
                          )) // Show skeletons while loading
                        : filteredUsers.map((u) => (
                            <FriendsCard
                                key={u.id}
                                _user={u} // Pass user data to the card
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}