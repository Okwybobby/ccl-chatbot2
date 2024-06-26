'use client'

import { PlusIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";


function NewChat() {

  const router = useRouter();
  const { data: session } = useSession();  
  
  const createNewChat = async () => {    
    console.log("db: ")
    console.dir(db)
    console.log("Email: ", session?.user?.email!)   
    try {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"), {        
        userId: session?.user?.email!,
        createdAt: serverTimestamp()
      }
    )
    router.push(`/chat/${doc.id}`) 
  }catch (error) {
      console.error("Error adding document: ", error);
    }       
}

return (
  <div onClick={createNewChat} className="border-gray-700 border chatRow" >
    <PlusIcon className="h-4 w-8" />
    <p>New Chat</p>
  </div >
)
}

export default NewChat