'use client';

const SkeletonContactUser = () => {
    return (
        <li className="flex items-center gap-3 hover:bg-gray-200 rounded-lg cursor-pointer p-2 animate-pulse">
            <div className="w-10 h-10 relative">
                <div className="w-full h-full rounded-full bg-gray-300" /> {/* Placeholder for image */}
                <div className="bottom-0 right-0 absolute w-[12px] h-[12px] bg-gray-300 border-[2px] rounded-full border-white"></div> {/* Placeholder for status dot */}
            </div>
            <div className="h-5 w-24 bg-gray-300 rounded" /> {/* Placeholder for name */}
        </li>
    );
};

export default SkeletonContactUser;