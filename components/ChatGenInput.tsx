'use client'

import { useState, useEffect, FormEvent } from 'react';
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import ModelSelection from './ModelSelection';
import { db } from '@/firebase';
// import query from "../lib/queryGenApi";
// import query from '@/pages/api/queryGenApi2';
import { NextApiRequest, NextApiResponse } from "next"

// eventsEmitter from '@/pages/api/eventEmitter'; // or any other meaningful name

// type Props = {
//     chatId: string;
//     sendDataToChat: (data: string) => void;
//     dataFromChatInput: string | null;
//     resp: string;
// };

interface Props {
    chatId: string;
    // sendDataToChat2: (data: string) => void;
    // dataFromChatInput: string | null;
    updateMessages: (data: string) => void;
}

type Data = {
    answer: string;
};

interface IMessage {
    // id: string;
    text: string;
    createdAt: Date;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}

// const ChatGenInput: React.FC<Props> = ({ chatId, sendDataToChat2, dataFromChatInput, updateMessages }) => {
const ChatGenInput: React.FC<Props> = ({ chatId, updateMessages }) => {
    const [prompt, setPrompt] = useState('');
    const { data: session } = useSession();
    const [eventSource, setEventSource] = useState<EventSource | null>(null);

    console.log('use....Effect');

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        // const sendMessage = async (e: FormEvent<HTMLFormElement>, data: string) => {
        e.preventDefault();
        if (!prompt || !session) return;

        const input = prompt.trim();
        setPrompt('');

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            },
        };

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message);

        const notification = toast.loading('CCLBot is thinking...');

        // ... (Logic to update messages based on server response can be removed)

        // Update messages using the provided prop function (assuming data is received chunk)
        // updateMessages(input);

        try {
            const response = await fetch('/api/askGenQuestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    chatId, // Add chatId to the body
                })
            });

            const data = await response.json();
            console.log("ddd: ", data) 
            // ... handle response data (potentially update messages)
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle errors appropriately
        }
    

    toast.success('CCLBot has responded', {
        id: notification,
    });
};

useEffect(() => {
    console.log("useEffect.......")

    if (!eventSource) {
        const newEventSource = new EventSource('/api/askGenQuestion');
        setEventSource(newEventSource);

        newEventSource.onmessage = (event) => {
            console.log("newEventSource.onmessage.........")
            if (event.type === 'message') {
                const data = JSON.parse(event.data);
                updateMessages(data); // Update messages with received data chunk
            } else if (event.type === 'chunk') {
                const chunkData = JSON.parse(event.data);
                // Process the received chunk here (e.g., update UI)
                console.log('Received chunk:', chunkData);
                // You can call updateChatMessages(chunkData) here to update chat messages dynamically
            }
        };

        newEventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            // Handle error if necessary
        };
    }


    return () => {
        if (eventSource) {
            eventSource.close(); // Close EventSource connection when component unmounts
        }
    };
}, [eventSource]); // Use eventSource as a dependency


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
};

export default ChatGenInput;
