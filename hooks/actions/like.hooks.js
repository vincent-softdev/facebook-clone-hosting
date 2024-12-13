import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export const checkLike = (postId, userId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const postRef = doc(db, "posts", postId);
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsLiked(data.likes?.includes(userId) || false);
        setLikeCount(data.likes?.length || 0);
      }
    });

    return () => unsubscribe();
  }, [postId, userId]);

  return { isLiked, likeCount };
};

export const toggleLike = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      const userLikes = postData.likes || [];

      if (userLikes.includes(userId)) {
        // Remove userId from the likes array
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
      } else {
        // Add userId to the likes array
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });
      }
    } else {
      console.error("Post does not exist.");
    }
  } catch (error) {
    console.error("Error toggling like:", error);
  }
};
