import { useState, useEffect, FormEvent } from 'react';
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import useSWR from "swr";
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import ModelSelection from './ModelSelection';
import { db } from '@/firebase';

type Props = {
    chatId: string
}

interface IMessage {
    id: string;
    text: string;
    createdAt: Date;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}


function ChatGenInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    const [messages, setMessages] = useState<IMessage[]>([]);

    const { data: model } = useSWR("model", {
        fallbackData: "gpt-3.5-turbo"
    });

    // const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (!prompt || !session) return;

    //     const input = prompt.trim();
    //     setPrompt("");

    //     try {
    //         const response = await fetch('/api/askGenQuestion', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 prompt: input,
    //                 chatId,
    //                 session,
    //             }),
    //         });

    //         const { answer } = await response.json();
    //         // Update UI with streaming text
    //         setPrompt(""); // Clear the prompt field
    //         appendMessageToUI(answer); // Append the new message to the UI

    //         // Display success toast notification
    //         toast.success('CCLBot has responded');
    //     } catch (error) {
    //         console.error('Error ChatGenInput:', error);
    //         toast.error('Error communicating with server');
    //     }
    // };

    // Function to append a new message to the UI

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Prompt: ", prompt);
        console.log("Session: ", session);

        if (!prompt || !session) return;

        try {
            //Toast notification to say loading!
            const notificaiton = toast.loading('CCLBot is thinking...')

            const response = await fetch('http://54.174.77.47/api/v1/chat/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: "1",
                    conversation_id: "1",
                    prompt: prompt,
                    use_history: "false"
                }),
                // body: JSON.stringify({ prompt, chatId, session }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
                // throw new Error('Failed to fetch');
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Response body is not readable');
            }

            let messages = []; // Array to store received messages
            let result = '';

            while (true) {
                const { done, value } = await reader.read();
                // console.log(value, "... ")
                if (done) {
                    console.log('Stream has ended');
                    toast.success('CCLBot has responded', {
                        id: notificaiton,
                    }
                    )
                    break;
                }

                console.log(new TextDecoder().decode(value));
                result += new TextDecoder().decode(value);

                const messageText = new TextDecoder().decode(value);
                // messages.push({
                //     text: messageText, createdAt: new Date(), user: {
                //         _id: "CCLBot",
                //         name: "CCLBot",
                //         avatar: "/images/favicon.png"
                //     }
                // });

                // Update UI with the received message chunk (call a function in Chat2.tsx)
                // updateChatMessages(messageText); // This function needs to be implemented in Chat2.tsx
                // messages = []; // Reset the messages array for the next iteration
            }
        } catch (error) {
            console.error('!!!Error ChatGenInput:', error);
            toast.error('Error communicating with server');
        }
    };

    // Function to update chat messages in Chat2.tsx (implementation in next step)
    const updateChatMessages = (messages: string) => {
        console.log(messages)
        // setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        // Implement logic to update the state or props in Chat2.tsx to reflect the new messages
    };



    const appendMessageToUI = async (messageText: string) => {
        const message: Message = {
            text: messageText,
            createdAt: new Date(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }
        };

        // Add the message to Firestore
        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message);
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
