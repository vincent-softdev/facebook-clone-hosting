const StoryCard = ({detail}) => {
    return (
        <div style={{backgroundImage: `url(${detail.story_image})`}}
            className="w-[140px] h-[250px] text-[13px] bg-cover rounded-xl bg-center text-white relative font-semibold p-3 pt-5 justify-between flex flex-col bg-no-repeat cursor-pointer transition-all overflow-hidden object-cover">
            <div style={{backgroundImage: `url(${detail.profile_image})`}} className="w-12 h-12 rounded-full bg-center bg-cover border-[5px] border-[#156ae6] cursor-pointer"></div>
            <p>{detail.name}</p>
        </div>
    )
}

export default StoryCard
