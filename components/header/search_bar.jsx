'use client'
// components/SearchBar.jsx
import { Icons } from "@/icons/icons"; // Adjust import as necessary
import { useState } from "react";
import Image from "next/image";

const SearchBar = () => {
    const [triggerInput, setTriggerInput] = useState(false)

    const turnInputOn = () => {
        setTriggerInput(true)
    }

    const turnInputOff = () => {
        setTriggerInput(false)
    }

    return (
        <div className="flex items-center">
            {!triggerInput && <Image src={"http://links.papareact.com/5me"} alt="" width={40} height={40} layout="fixed"/>}
            {
                triggerInput && (
                    <button onClick={turnInputOff} className="text-gray-600 mr-2">
                            <Icons.ArrowLeft className="h-6 w-6" />
                    </button>
                )
            }
            <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 h-10">
                <button onClick={turnInputOn}><Icons.SearchIcon className={triggerInput ? `h-6 text-gray-600 hidden`:`h-6 text-gray-600`} /></button>
                <input onClick={turnInputOn} className={`${triggerInput ? '': 'hidden'} lg:flex ml-2 items-center bg-transparent outline-none placeholder-gray-500`} type="text" placeholder="Search Facebook"/>
            </div>
        </div>
        
    );
};

export default SearchBar;
