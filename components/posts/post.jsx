import React from "react";
import CreatePost from "./create_post";
import PostCard from "./post_card";
import Spinner from "../spinner/spinner";
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "@/app/firebase";
import { collection, query, orderBy } from "firebase/firestore";

const Post = () => {
    const userSession = sessionStorage.getItem('user')

    // Use query to order posts by date
    const postsQuery = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const [realtimePosts, loading, error] = useCollection(postsQuery);

    if (!userSession) {
        return <Spinner />; // Show spinner if session is not available
    }

    return (
        <div className="mt-4">
            <CreatePost />
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
