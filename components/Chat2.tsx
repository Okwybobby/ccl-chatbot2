'use client'

import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"
import Message from "./Message"
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"

// type Props = {
//   chatId: string
// }

interface Props {
  // sendDataToChatInput: (data: string) => void;
  // dataFromChatInput: string | null;
  chatId: string;
}

// function Chat2({ chatId }: Props) {
  // const Chat2: React.FC<Props> = ({ chatId, sendDataToChatInput, dataFromChatInput }) => {
  const Chat2: React.FC<Props> = ({ chatId }) => {
  const { data: session } = useSession()

  // const handleChat = () => {
  //   sendDataToChatInput('Data from Child Component A');
  // };

  // const handleChatClear = () => {
  //   sendDataToChatInput(' ');
  // };

  const [messages] = useCollection(session && query(
    collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  ))

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5
          text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()} />
      ))}

      {/* <p className="text-orange-100">Data from stream: {dataFromChatInput}</p> */}
      <p className="text-orange-100">Data from stream: {}</p>
    </div>
  )
}

export default Chat2