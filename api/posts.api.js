import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase";

export const toggleLike = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      const userLikes = postData.likes || [];

      if (userLikes.includes(userId)) {
        // Remove userId from the like array
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });
      } else {
        // Add userId to the like array
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

export const fetchPostsFromDB = async () => {
  try {
    const postsQuery = query(collection(db, "posts"), orderBy("date", "desc"));

    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
