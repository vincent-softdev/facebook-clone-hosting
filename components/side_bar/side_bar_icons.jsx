import { useState } from "react";
import { Icons } from "@/icons/icons";
import Image from "next/image";
import { user } from "@/constants/data";

const SideBarIcons = () => {
    const imageSrc = "https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/cJdNYgqUyfE.png";
    const imageSrc2 = "https://static.xx.fbcdn.net/rsrc.php/v3/y0/r/y_JP1zKVuhp.png";
    const imageSrc3 = "https://static.xx.fbcdn.net/rsrc.php/v3/yP/r/kkZMFLIvmMQ.png";

    const icons = [
        {core_url: 1, icon_position: "0px -333px", bg_size: "", url: "", name: "Friends", path: ""}, 
        {core_url: 1, icon_position: "0px -481px", bg_size: "", url: "",name: "Memories", path: ""},
        {core_url: 1, icon_position: "0px -185px", bg_size: "", url: "",name: "Saved", path: ""},
        {core_url: 1, icon_position: "0px -37px", bg_size: "", url: "",name: "Groups", path: ""},
        {core_url: 1, icon_position: "0px -555px", bg_size: "", url: "",name: "Video", path: ""},
        {core_url: 1, icon_position: "0px -444px", bg_size: "", url: "",name: "Marketplace", path: ""},
        {core_url: 0, icon_position: "", bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/kD5Sv0isIPs.png", name: "Feeds", path: ""},
        {core_url: 0, icon_position: "", bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/y5w6W9F6KEL.png", name: "Ads Manager", path: ""},
        {core_url: 1, icon_position: "0px 0px",bg_size: "", url: "", name: "Birthdays", path: ""},
        {core_url: 0, icon_position: "",bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/4LP02rGQaMl.png", name: "Climate Science Center", path: ""},
        {core_url: 1, icon_position: "0px -296px",bg_size: "", url: "", name: "Events", path: ""},
        {core_url: 1, icon_position: "0px -370px",bg_size: "", url: "", name: "Fundraisers", path: ""},
        {core_url: 1, icon_position: "",bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/Cx_zTHRcUJ0.png", name: "Gaming Video", path: ""},
        {core_url: 2, icon_position: "0px -83px", bg_size: "83px 229px", url: "", name: "Messenger", path: ""},
        {core_url: 0, icon_position: "", bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/PJgSIvD_WNs.png", name: "Messenger Kids", path: ""},
        {core_url: 1, icon_position: "0px -111px", bg_size: "37px 592px", url: "", name: "Meta Quest 3S", path: ""},
        {core_url: 0, icon_position: "", bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/yM/r/vWBUs7aYAiK.png", name: "Orders and payments", path: ""},
        {core_url: 1, icon_position: "0px -148px", bg_size: "37px 592px", url: "", name: "Pages", path: ""},
        {core_url: 1, icon_position: "0px -74px", bg_size: "37px 592px", url: "", name: "Play games", path: ""},
        {core_url: 0, icon_position: "", bg_size: "", url: "https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/oMAmIAZyMMc.png", name: "Recent ad activity", path: ""},
        {core_url: 3, icon_position: "0px 0px", bg_size: "37px 74px", url: "", name: "Reels", path: ""}
    ]

    // State to control whether to show all icons or only the first three
    const [showAll, setShowAll] = useState(false);

    // Handle the toggle of show more/less
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <ul className="w-[281px]">
            <li className="flex gap-3 items-center h-11 hover:bg-gray-100 cursor-pointer p-2 rounded-md">
                {/* Display profile image and name */}
                <Image src={user.image} alt="Profile" className="h-9 w-9 rounded-full" width={0} height={0} />
                <div>{user.name}</div>
            </li>

            {/* Render the icons, but limit to the first 3 when showAll is false */}
            {icons &&
                (showAll ? icons : icons.slice(0, 7)).map((icon, index) => (
                    <li key={index} className="flex gap-3 items-center h-11 hover:bg-gray-200 cursor-pointer p-2 rounded-md">
                        {icon.icon_position !== "" ? (
                            <div
                                style={{
                                    backgroundImage: `url(${icon.core_url === 1 ? imageSrc : icon.core_url === 2 ? imageSrc2 : imageSrc3})`,
                                    backgroundPosition: `${icon.icon_position}`,
                                    backgroundSize: `${icon.bg_size !== "" ? icon.bg_size : `37px 592px`} `,
                                    backgroundRepeat: "no-repeat"
                                }}
                                className="h-9 w-9 p-2 rounded-full bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-80 active:opacity-60"
                            ></div>
                        ) : (
                            <img src={icon.url} alt="Profile" className="h-9 w-9 rounded-full" />
                        )}
                        <p>{icon.name}</p>
                    </li>
                ))}

            {/* See more / See less button */}
            <li className="flex gap-3 items-center h-11 hover:bg-gray-200 cursor-pointer p-2 rounded-md" onClick={toggleShowAll}>
                {showAll ? (
                    <>
                        <Icons.ArrowUp className="h-9 w-9 bg-gray-300 rounded-full p-2" />
                        <div>See less</div>
                    </>
                ) : (
                    <>
                        <Icons.ArrowDown className="h-9 w-9 bg-gray-300 rounded-full p-2" />
                        <div>See more</div>
                    </>
                )}
            </li>
        </ul>
    );
};

export default SideBarIcons;
