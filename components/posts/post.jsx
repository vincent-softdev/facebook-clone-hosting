'use client';
import React, { useEffect, useState, useRef, useCallback } from "react";
import CreatePost from "./create_post";
import PostCard from "./post_card";
import SkeletonPostCard from "../skeleton/post_card";
import { db } from "@/app/firebase";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { user } from "@/constants/data";

const POSTS_PER_PAGE = 1; // Number of posts to load per batch

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Manage both initial and lazy loading
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef(); // Observer for infinite scrolling

    // Fetch posts (used for both initial and subsequent fetches)
    const fetchPosts = async (isInitial = false) => {
        setLoading(true);
        try {
            const postsQuery = query(
                collection(db, "posts"),
                orderBy("date", "desc"),
                isInitial ? limit(POSTS_PER_PAGE) : startAfter(lastVisible), // Adjust for initial or lazy load
                limit(POSTS_PER_PAGE)
            );

            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setPosts((prevPosts) =>
                isInitial ? newPosts : [...prevPosts, ...newPosts]
            );
            setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Track the last visible doc
            setHasMore(snapshot.docs.length === POSTS_PER_PAGE); // Check if more posts are available
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);
    };

    // Use IntersectionObserver to detect when the user scrolls to the bottom
    const lastPostElementRef = useCallback(
        (node) => {
            if (loading) return; // Prevent loading more if already loading
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchPosts(); // Fetch more posts
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // Fetch initial posts on component mount
    useEffect(() => {
        fetchPosts(true); // Initial load
    }, []);

    if (!user) return <SkeletonPostCard />; // Use skeleton loader if session is unavailable

    return (
        <div className="flex gap-5 flex-col">
            <CreatePost />
            {/* Posts */}
            <div className="flex flex-col gap-5">
                {loading && !posts.length ? (
                    // Show skeleton loaders for the initial load
                    Array.from({ length: POSTS_PER_PAGE }).map((_, idx) => (
                        <SkeletonPostCard key={idx} />
                    ))
                ) : (
                    posts.map((post, index) => {
                        if (index === posts.length - 1) {
                            // Attach ref to the last post for infinite scrolling
                            return (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    ref={lastPostElementRef}
                                />
                            );
                        } else {
                            return <PostCard key={post.id} post={post} />;
                        }
                    })
                )}

                {/* Lazy loading skeleton */}
                {loading && posts.length > 0 && <SkeletonPostCard />}
            </div>
            {!hasMore && <p>You are up-to-date</p>} {/* Message if no more posts */}
        </div>
    );
};

export default Post;
