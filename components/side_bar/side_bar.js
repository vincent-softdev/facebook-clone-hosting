import SideBarIcons from './side_bar_icons';
import Shortcuts from "./shortcuts";
import { useState, useEffect } from 'react';

const SideBar = () => {
    const [userSession, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = sessionStorage.getItem("user");
            if (storedUser) {
            setUser(JSON.parse(storedUser));
            }
        }
    }, []);


    if (!userSession) {
        return <div>Please log in.</div>;
    }

    const profile = {
        image: userSession?.image,
        name: userSession?.name,
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
