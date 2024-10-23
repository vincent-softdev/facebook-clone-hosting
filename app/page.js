// /app/page.js
'use client'

import Login from "@/components/login/login";
import SideBar from "@/components/side_bar/side_bar";
import Stories from "@/components/story/stories";
import Contacts from "@/components/contacts/contacts";
import Post from "@/components/posts/post";
import { useSession } from 'next-auth/react';

export default function Home() {
    // Use the utility to fetch the session
    const { data: session } = useSession();

    // If there's no session, render the login page
    if (!session) {
        return <Login />; // Render the Login component if not authenticated
    }

    // Render the header and session info if logged in
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
