import react from "react"
import CreatePostModal from "./create_post_modal"
import { user } from "@/constants/data"

const CreatePost = () => {
    const [isModalOpen, setIsModalOpen] = react.useState(false)

    const features = [
        {
            id: 1,
            icon_src: "https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/epGAMnVkMsy.png",
            name: "Live video"
        },
        {
            id: 2,
            icon_src: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/74AG-EvEtBm.png",
            name: "Photo/video"
        },
        {
            id: 3,
            icon_src: "https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/_RWOIsUgWGL.png",
            name: "Feeling/activity"
        }
    ]

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="bg-white w-full px-4 pt-3 pb-[10px] rounded-lg">
                <div className="h-10 flex gap-2 mb-3">
                    <div style={{backgroundImage: `url(${user.image})`}}
                    className="h-10 w-10 p-2 rounded-full bg-gray-200 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-80 active:opacity-60">
                    </div>
                    <div 
                        className="h-[100%] w-[100%] bg-[#f0f2f5] rounded-full px-3 py-2 text-gray-500 cursor-pointer"
                        onClick={openModal}
                        >
                        <p>What`s on your mind, {user.name}?</p>
                    </div>
                </div>
                <hr className="my-2 border-none h-[1px] bg-gray-200"/>
                <div className="flex">
                    {
                        features.map((item, idx) => {
                            return (
                                <div key={idx} className="hover:bg-[#f0f2f5] hover:rounded-lg cursor-pointer p-2 gap-2 grow flex justify-center items-center font-semibold text-gray-500">
                                    <img src={item.icon_src} className="w-6 h-6" alt={item.name + ` icon`}/>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* modal */}
            {
                isModalOpen && (
                    <CreatePostModal closeModal={closeModal}/>
                )
            }
        </>
    )
}

export default CreatePost