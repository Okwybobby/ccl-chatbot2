// 2:15:11
// npm install react-hot-toast

'use client'

import { db } from "@/firebase"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
// import { Message } from "postcss"
import { FormEvent, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import toast from "react-hot-toast"
import ModelSelection from "./ModelSelection"
import useSWR from "swr";

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()

    const {data: model} = useSWR("model", {

        // fallbackData: 'const model = "gpt-3.5-turbo"'
        fallbackData: "gpt-3.5-turbo"
      })

    // TODO: useSWR to get model
    // const model = "gpt-3.5-turbo"
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return

        const input = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }
            // type: ""
        }
        


        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        //Toast notification to say loading!
        const notificaiton=toast.loading('CCLBot is thinking...')

        console.log('Asking ChatGPT...')
        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, 
                chatId, 
                model, 
                session,
            }),
        }).then(() => {
            // toast notificaiton to say successful
            
            toast.success('CCLBot has responded', {
                id: notificaiton,  
            }
            )
        })
    }

    return (
        <div className="sticky bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input
                    className="bg-transparent focus:outline-none flex-1
                disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />

                <button disabled={!prompt || !session} type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold
                px-4 py-2 rounded disabled:bg-gray-300
                disabled:cursor-not-allowed
                "

                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>
            <div className="md:hidden">
                <ModelSelection />

            </div>
        </div>
    )
}

export default ChatInput