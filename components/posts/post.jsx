'use client';
import React from "react";
import { useSession } from "next-auth/react";
import CreatePost from "./create_post";
import PostCard from "./post_card";
import Spinner from "../spinner/spinner";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "@/app/firebase";
import { collection, query, orderBy } from "firebase/firestore";

const Post = () => {
    const { data: session } = useSession();

    // Use query to order posts by date
    const postsQuery = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const [realtimePosts, loading, error] = useCollection(postsQuery);

    if (!session) {
        return <Spinner />; // Show spinner if session is not available
    }

    const profile = {
        image: session.user?.image || "", // Ensure session.user exists
        name: session.user?.name || "Anonymous", // Provide fallback if no name
        email: session.user?.email || "Unknown"
    };

    return (
        <div className="mt-4">
            <CreatePost profile={profile} />
            {/* Posts */}
            {loading && <Spinner />}
            <div className="flex flex-col gap-4">
                {!loading && realtimePosts && (
                    realtimePosts.docs.map((post) => (
                        <PostCard key={post.id} post={post.data()} />
                    ))
                )}
            </div>
            {error && <p>Error loading posts: {error.message}</p>}
        </div>
    );
}

export default Post;
