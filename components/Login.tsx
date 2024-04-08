'use client'
import { signIn } from "next-auth/react"
import Image from "next/image"

function Login() {
    return (
        <div className="bg-[#11A37f] h-screen flex flex-col items-center justify-center text-center">
            <Image
                // src="https://freelogopng.com/images/all_img/1681038628chatgpt-icon-logo.png"
                src="/images/aibot.png"
                width={300}
                height={300}
                 alt="logo"
            />
            <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse">
                Sign In to Use CCLbot
            </button>
        </div >
    );
}

export default Login;