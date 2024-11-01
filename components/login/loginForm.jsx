"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
// import { auth } from "@/app/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Turn off sign in
      // const res = await signInWithEmailAndPassword(email, password)

      // console.log({res})
      
      setEmail('')
      setPassword('')
      router.push("/")
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="grid place-items-center bg-[#f2f4f7]">
      <div className="h-[720px] flex flex-col gap-7 md:gap-9 lg:w-[980px] md:flex-row items-center">
        <div className="w-[400px] lg:w-[580px] pb-4 flex flex-col text-center pt-32px mt-10 md:mt-0 md:text-left md:block md:h-[300px]">
          <p className="text-blue-600 font-bold text-[50px]">
            Facebook Clone
          </p>
          <h2 className="text-[24px]">
            This is not a facebook page, this is just a Facebook clone personal project used to demonstrate developer coding skills.
          </h2>
          <p className="mt-[20px] text-red-400">
            <strong className="text-red-600">Warning</strong>: Please do not use any username and password belonging to yourself. You can directly enter to homepage without login.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 p-6 rounded-lg shadow-lg flex-col items-center bg-white min-w-[396px] sm:w-[396px] h-fit"
          >
            <input
              type="email"
              placeholder="Email address or phone numbe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full p-2 border rounded-lg text-[17px] px-[14px] py-[16px]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full p-2 border rounded-lg text-[17px] px-[14px] py-[16px]"
            />
            <button
              type="submit"
              className="p-3 text-[20px] font-bold w-full bg-[#0866ff] rounded-lg text-white text-center cursor-pointer"
            >
              Login
            </button>
            <p>Forgotten password?</p>
            <hr />
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="h-12 text-[20px] font-bold px-5 bg-[#42b72a] w-fit rounded-lg text-white text-center cursor-pointer"
            >
              Create new account
            </button>
          </form>
          <p className="mt-7">
            <b>Create a Page</b> for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
