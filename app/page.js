'use client';

import SideBar from "@/components/side_bar/side_bar";
import Stories from "@/components/story/Stories";
import Contacts from "@/components/contacts/Contacts";
import Post from "@/components/posts/Post";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
    const auth = getAuth()
    const user = auth.currentUser
    const router = useRouter()

    if(user) {
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
    else{
        router.push('/sign-in')
    }
    
}
