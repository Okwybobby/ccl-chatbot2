'use client'

import { ChatBubbleBottomCenterTextIcon, UserIcon, StopCircleIcon, LinkIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ArrowLeftIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { useSession, signOut } from 'next-auth/react';
import { useCollection } from "react-firebase-hooks/firestore";
import NewChat from '../components/NewChat'
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from '../components/ChatRow';

// import {
//     AiOutlineMessage,
//     AiOutlinePlus,
//     AiOutlineUser,
//     AiOutlineSetting,
//   } from "react-icons/ai";

function SideBar() {
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session &&
        query(
            collection(db, 'users', session.user?.email!,
                "chats"),
            orderBy("createdAt", "asc")
        )

    )
    return (
        <div className="p-2 flex flex-col h-screen" >
            <div className="flex-1">
                <div>
                    {/* NewChat*/}
                    <NewChat />

                    <div>
                        {/* ModelSelection */}
                    </div>

                    {/* Map through the ChatRows */}
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}


                </div>
            </div>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                {/* <AiOutlineMessage className="h-4 w-4" /> */}
                <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                Clear conversations
            </a>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                <Cog6ToothIcon className="h-4 w-4" />
                Settings
            </a>
            <a
                href="https://help.openai.com/en/collections/3742473-chatgpt"
                target="_blank"
                className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
            >
                <QuestionMarkCircleIcon className="h-4 w-4" />
                Get help
            </a>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
                Log out
            </a>
            {session && (
                < img
                    onClick={() => signOut()}
                    src={session.user?.image!}
                    alt="Profile pic"
                    className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
            hover:opacity-50"
                />
            )}

        </div>
    )
}

export default SideBar;