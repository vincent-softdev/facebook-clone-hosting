"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { usePathname } from "next/navigation";

const IconList = ({ icons }) => {
    const router = useRouter(); // Initialize the router

    const handleIconClick = (path) => {
        if (path) {
            router.push(path); // Navigate to the desired path
        }
    };

    const pathname = usePathname();

    return (
        <ul className="flex">
            {icons.map((item, index) => (
                <li
                    key={index}
                    onClick={() => handleIconClick(item.path)} // Pass the path for navigation
                    className={`flex-shrink-0 w-20 lg:w-28 flex justify-center cursor-pointer ${
                        item.path === pathname
                            ? "text-blue-500 border-b-2 border-blue-500"
                            : "text-gray-600 md:hover:bg-gray-100 md:hover:rounded-xl"
                    }`}
                >
                    <item.icon
                        type={item.path === pathname ? "solid" : undefined}
                        className={`h-12 w-12 p-2`}
                    />
                </li>
            ))}
        </ul>
    );
};

export default IconList;
