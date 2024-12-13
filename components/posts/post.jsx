"use client";
import React from "react";
import CreatePost from "./create_post";
import PostCard from "./post_card";
import SkeletonPostCard from "../skeleton/post_card";
import { useFetchPosts } from "@/hooks/post.hooks";
import { useInfiniteScroll } from "@/hooks/post.hooks";
import { user } from "@/constants/data";

const Post = () => {
  const { posts, loading, hasMore, fetchPosts } = useFetchPosts();
  const lastPostElementRef = useInfiniteScroll(loading, hasMore, fetchPosts);

  if (!user) return <SkeletonPostCard />;

  return (
    <div className="flex gap-5 flex-col">
      <CreatePost />
      <div className="flex flex-col gap-5">
        {loading && !posts.length
          ? Array.from({ length: 1 }).map((_, idx) => (
              <SkeletonPostCard key={idx} />
            ))
          : posts.map((post, index) => {
              return (
                <PostCard
                  key={post.id}
                  post={post}
                  ref={index === posts.length - 1 ? lastPostElementRef : null}
                >
                  <PostCard.Header />
                  <PostCard.Content />
                  <PostCard.Footer>
                    <PostCard.Footer.Actions>
                      <PostCard.Footer.Actions.Like />
                      <PostCard.Footer.Actions.Comment />
                    </PostCard.Footer.Actions>
                  </PostCard.Footer>
                </PostCard>
              );
            })}

        {loading && posts.length > 0 && <SkeletonPostCard />}
      </div>
      {!hasMore && <p>You are up-to-date</p>}
    </div>
  );
};

export default Post;
