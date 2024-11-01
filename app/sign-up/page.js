"use client"; // Enable client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
// import { auth } from "@/app/firebase"

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    router.push("/");
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match!");
    //   return;
    // }
  
    // if (password.length < 6) {
    //   setError("Password should be at least 6 characters.");
    //   return;
    // }
  
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setError("Invalid email address.");
    //   return;
    // }
  
    // try {
    //   const res = await createUserWithEmailAndPassword(email, password);
    //   console.log("User created:", res);
      
    //   router.push("/sign-in");
    // } catch (e) {
    //   console.error("Firebase error:", e);
    //   setError(e.message);  // Show Firebase error message
    // }
  };
  

  return (
    <div className="grid place-items-center bg-[#f2f4f7] min-h-screen">
      <div className="h-auto flex flex-col gap-7 md:gap-9 lg:w-[600px] md:flex-row items-center">
        <div className="flex flex-col items-center w-full">
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 p-6 rounded-lg shadow-lg flex-col items-center bg-white min-w-[396px] w-full h-fit"
          >
            <h1 className="text-2xl font-bold">Create a New Account</h1>
            <p className="text-gray-500">It’s quick and easy.</p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg text-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg text-lg"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg text-lg"
              required
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="p-3 text-lg font-bold w-full bg-[#42b72a] rounded-lg text-white"
            >
              Sign Up
            </button>

            <p className="text-gray-600 mt-3">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/sign-in")}
                className="text-blue-500 cursor-pointer"
              >
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
