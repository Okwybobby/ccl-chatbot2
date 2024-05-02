import { NextApiRequest, NextApiResponse } from "next"
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDB } from "@/firebaseAdmin";
import Image from 'next/image'

type Data = {
    answer: string
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { prompt, chatId, model, session } = req.body
    

    if (!prompt) {
        res.status(400).json({
            answer: 'Please provide a prompt!'

        })
        return
    }

    if (!chatId) {
        res.status(400).json({
            answer: 'Please provide a valid chat ID!'
        })
        return
    }

    
    // ChatGPT Query
    // const response: string | Choice = await query(prompt, chatId, model)
    // const response = await query(prompt, chatId, model)
    const response = await query(prompt, chatId)

    const message: Message = {
        text: response || "CCLBot was unable to find an answer for that!",
        // text: response,
        createdAt: admin.firestore.Timestamp.now(),
        // user: {
        //     _id: session?.user?.email!,
        //     name: session?.user?.name!,
        //     avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        // }
        user:{
            _id: "CCLBot",
            name: "CCLBot",
            avatar: "/images/favicon.png",           
        }
    }

    console.log("Session:", session);
    console.log("Users:", session?.user);
    console.log("Email:", session?.user?.email);
    console.log("ChatId:", chatId);
    console.log("Message:", message);

    await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

    res.status(200).json({
        answer: message.text
    })
}

export default handler