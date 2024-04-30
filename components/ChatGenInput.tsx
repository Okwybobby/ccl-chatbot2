'use client'

import { useState, useEffect, FormEvent } from 'react';
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import ModelSelection from './ModelSelection';
import { db } from '@/firebase';
import query from "../lib/queryGenApi";
import { NextApiRequest, NextApiResponse } from "next"

import eventsEmitter from '@/pages/api/eventEmitter';
// const emitter = eventsEmitter; // or any other meaningful name

type Props = {
    chatId: string;
    sendDataToChat: (data: string) => void;
    dataFromChat: string | null;
    resp: string;
};

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

const ChatGenInput: React.FC<Props> = ({ chatId, sendDataToChat, dataFromChat }) => {
    const [prompt, setPrompt] = useState('');
    const { data: session } = useSession();
    // const {resp: string} = useState();

    const handleChat = (resp: string) => {
        sendDataToChat(resp);
    };

    async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
        try {
            const response = await query(prompt, chatId, (chunk) => {
                // Process the received chunk here (e.g., update UI)
                console.log('Streamed chunk...---->:', chunk);
                // You can call updateChatMessages(chunk) here to update chat messages

                // Send chunk to client
                // streamAnswer(chunk, res); 

                // Stream the chunk to the client
                res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
                // Emit event with the received chunk
                // eventsEmitter.emit('chunkReceived', chunk);
            })
            console.log('Response:', response);
            const message = {
                text: response || "CCLBot was unable to find an answer for that!",
                user: {
                    _id: "CCLBot",
                    name: "CCLBot",
                    avatar: "/images/favicon.png",
                }
            };

            console.log("ChatId:", chatId);
            console.log("Message:", message);

            // await adminDB
            //     .collection("users")
            //     .doc(session?.user?.email)
            //     .collection("genchats")
            //     .doc(chatId)
            //     .collection("messages")
            //     .add(message);

            res.status(200).json({
                answer: message.text
            });
            res.end(); // End the response stream
        } catch (error) {
            console.error('Error GenQuestion:', error);
            res.status(500).json({
                // answer: error.message.text
                answer: 'error'
            });
        }
    }

    // const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    // const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    async function sendMessage(e: FormEvent<HTMLFormElement>) {        
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
        // try {
        //     const response = await fetch('/api/askGenQuestion', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             prompt: input,
        //             chatId,
        //             session,
        //         }),
        //     });

        //     const { answer } = await response.json();
        //     setPrompt(answer);
        //     // Display success toast notification
        //     toast.success('CCLBot has responded', {
        //         id: notification,
        //     });
        // } 


        // try {
        //     const eventSource = new EventSource('/api/askGenQuestion', {
        //       withCredentials: true, // Ensure credentials are sent
        //     });

        //     eventSource.onmessage = (event) => {
        //       const { chunk } = JSON.parse(event.data);
        //       console.log("Chunk data----->", chunk)
        //       setPrompt((prevPrompt) => prevPrompt + chunk); // Concatenate new chunk to existing prompt
        //     };

        //     eventSource.onerror = (error) => {
        //       console.error('EventSource error:', error);
        //       // Handle error if necessary
        //     };

        //     // Send input prompt to the server
        //     await fetch('/api/askGenQuestion', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify({
        //         prompt: input,
        //         chatId,
        //         session,
        //       }),
        //     });

        //     // Display success toast notification
        //     toast.success('CCLBot has responded', {
        //       id: notification,
        //     });
        //   }
        // catch (error) {
        //     console.error('Error:', error);
        // }
        console.error('EEEEEE');
        console.error(prompt);
        console.error(chatId);
        try {
            const response = await query(prompt, chatId, (chunk) => {
                // Process the received chunk here (e.g., update UI)
                console.log('Streamed chunk...---->:', chunk);
                // You can call updateChatMessages(chunk) here to update chat messages

                // Send chunk to client                              
            })
            console.log('Response:', response);
            const message = {
                text: response || "CCLBot was unable to find an answer for that!",
                user: {
                    _id: "CCLBot",
                    name: "CCLBot",
                    avatar: "/images/favicon.png",
                }
            };

            console.log("ChatId:", chatId);
            console.log("Message:", message);

            // await adminDB
            //     .collection("users")
            //     .doc(session?.user?.email)
            //     .collection("genchats")
            //     .doc(chatId)
            //     .collection("messages")
            //     .add(message);

            // res.status(200).json({
            //     answer: message.text
            // });   
            toast.success('CCLBot has responded');        
        } catch (error) {
            console.error('Error GenQuestion:', error);
            // res.status(500).json({
            //     // answer: error.message.text
            //     answer: 'error'
            // });
        }

    };


    //     // Listen for chunkReceived event
    //     emitter.on('chunkReceived', (chunk) => {
    //         console.log('Streamed geninput chunk:', chunk);
    //         // Update UI with the received chunk (e.g., display partial response)

    //         handleChat(chunk)

    //         // You can implement logic here to update a dedicated element in the UI
    //     });

    //     // Remember to remove the listener when the component unmounts
    //     // return () => emitter.off('chunkReceived');
    //     return () => emitter.off('chunkReceived', (listener) => listener);
    // };

    // useEffect(() => {
    //     console.log('Adding event listener for chunkReceived');
    //     const handleChunkReceived = (chunk: string) => {
    //         console.log('Streamed geninput chunk:', chunk);
    //         // Update UI with the received chunk (e.g., display partial response)
    //         handleChat(chunk);
    //     };

    //     // Add event listener when component mounts
    //     eventsEmitter.on('chunkReceived', handleChunkReceived);

    //     // Remove event listener when component unmounts
    //     return () => {
    //         console.log('Removing event listener for chunkReceived');
    //         eventsEmitter.off('chunkReceived', handleChunkReceived);
    //     };
    // }); // Empty dependency array ensures that this effect runs only once, when the component mounts

    useEffect(() => {
        const eventSource = new EventSource('/api/askGenQuestion');

        eventSource.onmessage = (event) => {
            const { answer } = JSON.parse(event.data);
            setPrompt(answer);
            // Display success toast notification
            toast.success('CCLBot has responded');
        };

        eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            // Handle error if necessary
        };

        return () => {
            eventSource.close(); // Close EventSource connection when component unmounts
        };
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts



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
