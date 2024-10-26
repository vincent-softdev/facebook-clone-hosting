'use client';

import SideBar from "@/components/side_bar/side_bar";
import Stories from "@/components/story/Stories";
import Contacts from "@/components/contacts/Contacts";
import Post from "@/components/posts/Post";
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "./firebase";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [userSession, setUserSession] = useState(null);

    // Safely access sessionStorage only in the browser
    useEffect(() => {
      if (typeof window !== "undefined") {
        const sessionData = sessionStorage.getItem("user");
        if (sessionData) {
          setUserSession(JSON.parse(sessionData));
        }
      }
    }, []);

    // Optional: Redirect to login if no session or user is found
    useEffect(() => {
      if (!user && !userSession) {
        // router.push("/sign-in");
      }
    }, []);

    if (!userSession) return <p>Loading...</p>;

    // Render the home page only when the user is authenticated
    return (
        <div className="w-full flex flex-col items-center">
            <div className="mt-5 w-full 2xl:w-[1464px] flex justify-center gap-10">
                <SideBar />
                <div id="middle-home" className="flex flex-col overflow-hidden w-full max-w-[680px]">
                    <Stories />
                    <Post />
                </div>
                <Contacts />
            </div>
        </div>
    );
}
