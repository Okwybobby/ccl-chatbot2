import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { db } from "../firebase";

type Props = {
  chatId: string;
  addMessage: (message: Message) => void; // Existing prop
  // addMessage: (text: string) => void;
  messages: IMessage[]; // Add this line
};



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


function Chat2({ chatId, messages: propMessages }: Props) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const updateChatMessages = (newMessages: IMessage[]) => {
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    // setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  useEffect(() => {
    // Check if session and user email are available before querying Firestore
    console.log('Check if session and user email are available before querying Firestore')



    if (session && session.user && session?.user?.email) {
      const unsubscribe = onSnapshot(
        query(collection(db, "users", session.user.email, "genchats", chatId, "messages"), orderBy("createdAt", "asc")),
        (snapshot) => {
          console.log("Snapshot received:", snapshot.docs.length, "messages");
          // const updatedMessages: IMessage[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          const updatedMessages: IMessage[] = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as IMessage;
          });

          console.log("Updated messages:", updatedMessages);
          setMessages(updatedMessages);
        }
      );

      // Clean up listener on unmount
      return () => {
        console.log("Unsubscribing from Firestore listener");
        unsubscribe();
      };
    }
  }, [session, chatId]);

  console.log("Rendering Chat2 component with", messages.length, "messages");

  // console.log("db:", db);
  console.log("session:", session);
  console.log("session.user.email:", session?.user?.email);



  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {messages.length === 0 && (
        <>
          <p className="mt-10 text-center text-white">Type a prompt below to get started!</p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Chat2;
