'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { Message } from "@/postcss"; // Adjust the import path as needed
import toast from "react-hot-toast";
import useSWR from "swr";
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import ModelSelection from './ModelSelection';
import { db } from '@/firebase';


type Props = {
    chatId: string
}

function ChatGenInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    const { data: model } = useSWR("model", {
        fallbackData: "gpt-3.5-turbo"
    });

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt || !session) return;

        const input = prompt.trim();
        setPrompt("");

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
        // await addDoc(collection(db, 'users', session.user.email, 'genchats', chatId, 'messages'), message);

        const notification = toast.loading('CCLBot is thinking...');
        try {
            const response = await fetch('/api/askGenQuestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: input,
                    chatId,
                    session,
                }),
            });

            const { answer } = await response.json();
            setPrompt(answer);
            // Display success toast notification
            toast.success('CCLBot has responded', {
                id: notification,
            });
        } catch (error) {
            console.error('Error:', error);
        }

        // Listen for chunkReceived event
        // emitter.on('chunkReceived', (chunk) => {
        //     console.log('Streamed chunk:', chunk);
        //     // Update UI with the received chunk (e.g., display partial response)
        //     // You can implement logic here to update a dedicated element in the UI
        // });

        // Remember to remove the listener when the component unmounts
        // return () => emitter.off('chunkReceived');
        // return () => emitter.off('chunkReceived', (listener) => listener);

    };

    return (
        <div className="sticky bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input
                    className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />

                <button
                    disabled={!prompt || !session}
                    type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>
            <div className="md:hidden">
                <ModelSelection />
            </div>
        </div>
    );
}

export default ChatGenInput;
