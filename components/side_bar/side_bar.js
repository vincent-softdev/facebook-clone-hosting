// SideBar.js
"use client";

import { useSession } from "next-auth/react";
import SideBarIcons from './side_bar_icons';
import Shortcuts from "./shortcuts";

const SideBar = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Please log in.</div>;
    }

    const profile = {
        image: session.user.image,
        name: session.user.name,
    };

    return (
        <div className="p-2 hidden lg:inline-block max-w-[600px] lg:min-w-[280px] lg:w-[280px] xl:min-w-[300px]">
            {/* Pass the profile information to SideBarIcons */}
            <SideBarIcons profile={profile} />
            <hr className="my-2 border-none h-[1px] bg-gray-300"/>
            <Shortcuts />
        </div>
    );
};

export default SideBar;
