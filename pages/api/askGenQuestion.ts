import { NextApiRequest, NextApiResponse } from "next"
import query from "../../lib/queryGenApi";
import admin from "firebase-admin";
import { adminDB } from "@/firebaseAdmin";
import Image from 'next/image'

import eventsEmitter from '@/pages/api/eventEmitter';
// const emitter = eventsEmitter; // or any other meaningful name



type Data = {
    answer: string;
};

function streamAnswer(chunk: string, res: NextApiResponse) {
    res.write(`data: ${JSON.stringify({ answer: chunk })}\n\n`);
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const { prompt, chatId } = req.body;
    const { prompt, chatId, session } = req.body

    if (!prompt) {
        res.status(400).json({
            answer: 'Please provide a prompt!'
        });
        return;
    }

    if (!chatId) {
        res.status(400).json({
            answer: 'Please provide a valid chat ID!'
        });
        return;
    }

    // try {
    //     const response = await query(prompt, chatId);
    //     console.log('Response:', response);

    //     const message = {
    //         text: response || "CCLBot was unable to find an answer for that!",
    //         user: {
    //             _id: "CCLBot",
    //             name: "CCLBot",
    //             avatar: "/images/favicon.png",
    //         }
    //     };

    //     console.log("ChatId:", chatId);
    //     console.log("Message:", message);

    //     await adminDB
    //         .collection("users")
    //         .doc(session?.user?.email)
    //         .collection("genchats")
    //         .doc(chatId)
    //         .collection("messages")
    //         .add(message);

    //     res.status(200).json({
    //         answer: message.text
    //     });
    // } catch (error) {
    //     console.error('Error GenQuestion:', error);
    //     res.status(500).json({
    //         // answer: error.message.text
    //         answer: 'error'
    //     });
    // }

    try {

        console.log('askgenquestion...:');

        // Added the missing res.writeHead call here:
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            // ... other headers (if needed)
        });

        const response = await query(prompt, chatId, (chunk) => {
            // Process the received chunk here (e.g., update UI)
            console.log('Streamed chunk...:', chunk);
            // You can call updateChatMessages(chunk) here to update chat messages

            // response = response + chunk
            // Send chunk to client
            // streamAnswer(chunk, res); 

            // Stream the chunk to the client
            res.write(`event: chunk\n`);
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);

            // res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
            // Emit event with the received chunk
            // eventsEmitter.emit('chunkReceived', chunk);
        });

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

    } catch (error) {
        console.error('Error GenQuestion:', error);
        res.status(500).json({
            // answer: error.message.text
            answer: 'error'
        });
    } finally {
        // Important: Close the connection to prevent resource leaks
        // res.status(200).json({
        //     answer: message.text
        // });
        res.end();
    }
}

export default handler;