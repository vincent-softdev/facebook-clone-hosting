"use client"
import {Icons} from "@/icons/icons"
import IconList from "./icon_list";
import SearchBar from "./search_bar";
import Personal from "./personal";
import { usePathname } from "next/navigation";

const Header = () => {
    const center = [
        {icon: Icons.HomeIcon, name: "Home", path: "/"}, 
        {icon: Icons.FriendIcon, name: "Friends", path: "/friends"}, 
        {icon: Icons.VideoIcon, name: "Video", path: "/video"}, 
        {icon: Icons.MarketplaceIcon, name: "Market", path: "/market"}, 
        {icon: Icons.GroupsIcon, name: "Group", path: "/group"}]

    const personal = [
        {icon: Icons.MenuIcon, name: "Menu", path: ""}, 
        {icon: Icons.MessengerIcon, name: "Messenger", path: ""}, 
        {icon: Icons.NotificationIcon, name: "Notifications", path: ""}
    ]

    const pathname = usePathname();
    const hideHeader = ["/sign-in", "/sign-up"].includes(pathname);

    return (
        <>
            {!hideHeader ? (
                <div className="flex sticky z-50 bg-white items-center p-2 px-5 shadow-md justify-between">
                    {/* Left */}
                    <SearchBar />
                    {/* center */}
                    <div className="hidden md:flex md:justify-center md:flex-grow">
                        <IconList icons={center}/>
                    </div>

                    {/* right */}
                    <div className="flex items-center sm:space-x-2 justify-end">
                        <Personal icons={personal}/>
                    </div>
                </div>
            ) : (<div></div>)}
        </>
        
    )
}

export default Header

