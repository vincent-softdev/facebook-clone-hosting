"use client"; // Make sure this is declared to enable client-side functionality

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation" // Note the change here
import Image from "next/image"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            console.error("Login failed:", result.error)
        } else {
            console.log('login good: ' + JSON.stringify(result))
            // Redirect to the homepage if successful
            router.push('/'); // Navigate to the homepage
        }
    }

    return (
        <div className="grid place-items-center bg-[#f2f4f7]">
            <div className="h-[720px] flex flex-col gap-7 md:gap-9 lg:w-[980px] md:flex-row items-center ">
                <div className="w-[400px] lg:w-[580px] pb-4 flex flex-col text-center pt-32px mt-10 md:mt-0 md:text-left md:block md:h-[300px]">
                    <Image src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" height={0} width={0} className="h-[106px] mb-0 w-auto m-[-28px]" alt="facebook clone" />
                    <h2 className="text-[24px]">Facebook helps you connect and share with the people in your life.</h2>
                </div>
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="flex gap-3 p-6 rounded-lg shadow-lg flex-col items-center bg-white min-w-[396px] sm:w-[396px] h-fit">
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 w-full p-2 border rounded-lg text-[17px] px-[14px] py-[16px]"
                        />
                        <input
                            type="password"
                            placeholder="admin"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 w-full p-2 border rounded-lg text-[17px] px-[14px] py-[16px]"
                        />
                        <button type="submit" className="p-3 text-[20px] font-bold w-full bg-[#0866ff] rounded-lg text-white text-center cursor-pointer">
                            Login
                        </button>
                        <p>Forgotten password?</p>
                        <hr />
                        <button type="submit" className="h-12 text-[20px] font-bold px-5 bg-[#42b72a] w-fit rounded-lg text-white text-center cursor-pointer">
                            Create new account
                        </button>
                    </form>
                    <p className="mt-7"><b>Create a Page</b> for a celebrity, brand or business.</p>
                </div>
            </div>
        </div>
    )
}

export default Login
