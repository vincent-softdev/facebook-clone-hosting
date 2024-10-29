'use client';

import SideBar from "@/components/side_bar/side_bar";
import Stories from "@/components/story/Stories";
import Contacts from "@/components/contacts/Contacts";
import Post from "@/components/posts/Post";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const auth = getAuth()
    const user = auth.currentUser
    const router = useRouter()

    // Use useEffect to handle redirection
    useEffect(() => {
        if (!user) {
            router.push("/sign-in");
        }
    }, [user, router]); // Dependency array ensures this runs when user state changes

    // Render home only when the user is authenticated
    if (!user) return null; // Avoid rendering before redirection

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
    )
}
