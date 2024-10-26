const SkeletonFriendsCard = () => {
    return (
        <div className="w-full border-[1px] shadow-md min-w-[200px] h-[376px] rounded-xl bg-white text-black font-semibold flex flex-col animate-pulse">
            {/* Image section */}
            <div className="h-[200px] w-full bg-gray-300 rounded-t-xl" />

            {/* Content section */}
            <div className="p-3 flex flex-1 flex-col justify-between">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="flex flex-col gap-2 mt-auto">
                    <button className="bg-gray-300 h-10 rounded-md" />
                    <button className="bg-gray-200 h-10 rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonFriendsCard;