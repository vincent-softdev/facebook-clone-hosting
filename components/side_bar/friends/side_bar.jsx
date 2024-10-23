// SideBar.js
import { SolidIcons } from "@/icons/icon_solid";

const SideBar = () => {
    return (
        <div className="w-[360px] bg-white pt-5 px-2">
            {/* title and setting icons */}
            <div className="flex justify-between mb-4 px-3">
                <h1 className="text-[1.5rem] font-bold">Friends</h1>
                <div className="w-9 h-9 bg-gray-200 cursor-pointer flex justify-center rounded-full">
                    <SolidIcons.SettingCog8Tooth className="w-6 text-black"/>
                </div>
            </div>
            {/* Home title */}
            <div className="bg-slate-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3">
                <div className="bg-blue-500 w-9 h-9 flex justify-center rounded-full">
                    <SolidIcons.FriendsIcon className="w-6 text-white"/>
                </div>
                <p className="font-medium">Home</p>
            </div>
        </div>
    );
};

export default SideBar;
