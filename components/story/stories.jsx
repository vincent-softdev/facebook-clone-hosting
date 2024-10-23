'use client'
import { useSession } from "next-auth/react";
import { Icons } from "@/icons/icons";
import StoryCard from "./story_card";

const Stories = () => {
    const { data: session } = useSession();

    const profile = {
        image: session.user.image,
        name: session.user.name,
    };

    const storiesData = [
        {
            id: 1,
            name: "Meta AI",
            profile_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegwlJ5JcK0ifGz1Sah65crLxUIbJY29z2lw&s",
            story_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF3C8ZBIsgu9FTNRI5QUAwJKEPLucC-Pc1Hw&s"
        },
        {
            id: 2,
            name: "Megatron",
            profile_image: "https://i.etsystatic.com/18406528/r/il/9403fd/4012545846/il_570xN.4012545846_pov0.jpg",
            story_image: "https://preview.redd.it/what-do-you-guys-think-of-megatron-of-the-movies-v0-pod0763igs3a1.jpg?auto=webp&s=c1d9493570a4e6d960d6b6177291992b7dd267f3"
        },
        {
            id: 3,
            name: "Ultron",
            profile_image: "https://static.wikia.nocookie.net/marveldatabase/images/1/1f/Avengers_Vol_8_66_Timeless_Variant.jpg/revision/latest?cb=20230311033732",
            story_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThN4LLLVh5s3u324AjPQ81CKnKU8ewb3_q6w&s"
        },
        {
            id: 4,
            name: "Tony Stark",
            profile_image: "https://static.wikia.nocookie.net/marvel-cinematic-universe-fanon/images/2/2f/TonyStark.jpeg/revision/latest?cb=20221210135043",
            story_image: "https://variety.com/wp-content/uploads/2016/10/iron-man.jpg?w=700&h=525&crop=1"
        }
    ]

    return (
        <div className="flex flex-row gap-3 overflow-x-auto">
            {/* Create story card */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent calc(100% - 50px), white 70px), url(${profile.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                }}
                className="border-[1px] shadow-md w-[140px] min-w-[140px] cursor-pointer h-[250px] rounded-xl bg-center text-black relative font-semibold p-3 pt-5 pb-2 justify-end items-center gap-1 flex flex-col bg-no-repeat transition-all object-cover"
            >
                <Icons.Add className="w-10 h-10 rounded-full p-1 text-white bg-[#0966ff] border-[4px] border-white" />
                <p className="text-[13px]">Create story</p>
            </div>

            {/* Map over the stories */}
            {storiesData.map((item, idx) => (
                <div key={idx}>
                    <StoryCard detail={item} />
                </div>
            ))}
        </div>
    );
}

export default Stories;
