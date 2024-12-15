import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

const fetchCurrentUserFriends = async ({
  user,
  setCurrentUserFriends,
  setLoading,
}) => {
  if (!user) return;

  const currentUserQuery = query(
    collection(db, "users"),
    where("email", "==", user.email)
  );

  const querySnapshot = await getDocs(currentUserQuery);
  if (!querySnapshot.empty) {
    const currentUserData = querySnapshot.docs[0].data();
    setCurrentUserFriends(currentUserData.friends || []); // Store friends' emails
  }
  setLoading(false); // Stop loading when done
};

export const FriendsAPIs = {
  fetchCurrentUserFriends,
};
