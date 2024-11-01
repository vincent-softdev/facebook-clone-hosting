import SideBar from "@/components/side_bar/side_bar";
import Stories from "@/components/story/Stories";
import Contacts from "@/components/contacts/Contacts";
import Post from "@/components/posts/Post";

export default function Home() {
    // Render the home page only when the user is authenticated
    return (
        <div className="w-full flex flex-col items-center">
            <div className="mt-5 w-full 2xl:w-[1464px] flex justify-center gap-10">
                <SideBar />
                <div id="middle-home" className="flex flex-col overflow-hidden gap-5 w-full max-w-[680px]">
                    <Stories />
                    <div className="h-[100px] text-white p-4 bg-red-400">
                        <strong>Warning</strong>: please do not enter any personal information inside the post as all other users can view it
                    </div>
                    <Post />
                </div>
                <Contacts />
            </div>
        </div>
    );
}
