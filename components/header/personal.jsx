'use client'

import { signOut } from 'firebase/auth'
import { useRouter } from "next/navigation";
import { auth } from '@/app/firebase';
import { user } from '@/constants/data';

const Personal = ({ icons }) => {
    const router = useRouter()

    return (
        <ul className="flex gap-2">
            {
                icons.map((item, index) => (
                    <li key={index} className="cursor-pointer ">
                        <item.icon className={`h-12 w-12 p-2 rounded-full bg-gray-200 hover:bg-gray-300`} />
                    </li>
                ))
            }
            <li
                style={{ backgroundImage: `url(${user.image})` }}
                onClick={() => { 
                    signOut(auth) 
                    sessionStorage.removeItem('user')
                    router.push('/sign-in')
                }}
                className="h-12 w-12 p-2 rounded-full bg-gray-200 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-80 active:opacity-60"
            />
        </ul>
    );
}

export default Personal
