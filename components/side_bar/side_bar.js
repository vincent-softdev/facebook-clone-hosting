import SideBarIcons from './side_bar_icons';
import Shortcuts from "./shortcuts";

const SideBar = () => {
    return (
        <div className="p-2 hidden lg:inline-block max-w-[600px] lg:min-w-[280px] lg:w-[280px] xl:min-w-[300px]">
            {/* Pass the profile information to SideBarIcons */}
            <SideBarIcons />
            <hr className="my-2 border-none h-[1px] bg-gray-300"/>
            <Shortcuts />
        </div>
    );
};

export default SideBar;