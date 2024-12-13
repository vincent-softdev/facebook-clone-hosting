import { useState, useEffect, useRef, useCallback } from "react";
import { fetchPostsFromDB } from "@/api/posts.api";

export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await fetchPostsFromDB();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(); // Fetch all posts on component mount
  }, []);

  return { posts, loading };
};

export const useInfiniteScroll = (loading, hasMore, fetchPosts) => {
  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(false); // Fetch next batch of posts
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts]
  );

  return lastPostElementRef;
};
