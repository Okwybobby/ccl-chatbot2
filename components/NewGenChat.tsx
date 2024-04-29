'use client'

import { PlusIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";


function NewGenChat() {

  const router = useRouter();
  const { data: session } = useSession();

  const createNewGenChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "genchats"), {        
        userId: session?.user?.email!,
        createdAt: serverTimestamp()
      }
    )

    router.push(`/chat2/${doc.id}`) 
}

return (
  <div onClick={createNewGenChat} className="border-gray-700 border chatRow" >
    <PlusIcon className="h-4 w-8" />
    <p>New Chat</p>
  </div >
)
}

export default NewGenChat