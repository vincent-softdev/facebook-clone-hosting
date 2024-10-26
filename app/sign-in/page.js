"use client"; // Enable client-side rendering

import LoginForm from "@/components/login/loginForm"

export default function Page() {
    return (
        <div className="grid place-items-center h-screen bg-[#f2f4f7]">
            <LoginForm /> {/* Reusable Login form */}
        </div>
    );
}
