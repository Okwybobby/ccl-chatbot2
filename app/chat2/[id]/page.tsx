'use client'

import { useEffect, useState } from 'react';
import Chat2 from '../../../components/Chat2'
import ChatGenInput from "../../../components/ChatGenInput"
import { adminDB } from '@/firebaseAdmin';
import { useSession } from "next-auth/react";
// import query from '../../../lib/queryGenApi'; // Import the query function
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { QuerySnapshot } from "firebase/firestore";

// import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { db } from "../../../firebase";

// import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import Message from "./Message";
// import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
// import { db } from "../firebase";



type Props = {
  params: {
    id: string;
    addMessage: (text: string) => Promise<void>;
  };
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


function ChatPage2({ params: { id } }: Props) {
  const [loading, setLoading] = useState(false);
  // const [messages, setMessages] = useState<string[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data: session } = useSession();

  type Props = {
    chatId: string;
    addMessage: (text: string) => void;
    messages: IMessage[]; // Add this line
  };



  useEffect(() => {
    // Check if session and user email are available before querying Firestore
    console.log('Check if session and user email are available before querying Firestore')

   


  if (session && session?.user?.email) {
    const unsubscribe = onSnapshot(
      // query(collection(db, "users", session.user.email, "genchats", id, "messages"), orderBy("createdAt", "asc")),
      // query(db.collection("users").doc(session.user.email).collection("genchats").doc(id).collection("messages"), orderBy("createdAt", "asc")),

      query(collection(db, "users", session.user.email, "genchats", id, "messages"), orderBy("createdAt", "asc")),

      (snapshot: { docs: any[]; }) => {
        console.log("Snapshot received:", snapshot.docs.length, "messages");
        // const updatedMessages: IMessage[] = snapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
        const updatedMessages: IMessage[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
}, [session, id]);


const addMessage = async (text: string) => {
  setLoading(true);
  try {
    // Add message to Firestore or other backend
  } catch (error) {
    console.error("Error adding message:", error);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="flex flex-col h-screen overflow-hidden">
    <Chat2 chatId={id} messages={messages} />
    <ChatGenInput chatId={id} />
  </div>
);
}

export default ChatPage2;
