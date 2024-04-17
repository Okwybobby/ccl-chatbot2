"use client"

import React from 'react'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Import useRouter hook
// import Chat from "@/components/Chat";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function HomePage() {

  const router = useRouter(); // Initialize useRouter hook
  const { data: session } = useSession();

  const handleProposalClick = async () => {
    // Navigate to the proposal page

    console.log("Okwy Proposal Page")
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    }
    )

    router.push(`/proposal/${doc.id}`)
    // router.push('/proposal'); // Modify the path as needed
  };

  return (
    <div className='flex flex-col items-center justify-center 
    h-screen px-2 text-white'>
      <h1 className='text-xl font-bold mb-20 text-center'>CCL Chatbot</h1>

      {/* <Image src="/images/aibot.png" alt="Aibot" width={100} height={100} /> */}
      <div className='flex text-xs space-x-2 text-center'>
        <div>
          <div className='flex flex-col items-center mb-5 justify-center'>
            {/* Sun Icon */}
            <SunIcon className="h-8 w-8" />
            <h2>Proposal</h2>
          </div>

          {/* <div onClick={createNewProposal} className='space-y-2'> */}
          <div className='space-y-2'>
            <button id="proposal"
              onClick={handleProposalClick}
              className="bg-gray-600 min-w-max text-xs hover:bg-gray-700 py-4 px-4 mx-4  my-2 rounded-md">Write
              Proposal →</button>
            {/* <p className='infoText'>Explain Somethin to me</p>
            <p className='infoText'>Explain xyz</p>
            <p className='infoText'>Explain abc</p> */}
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center mb-5 '>
            {/* Sun Icon */}
            <BoltIcon className="h-8 w-8" />
            <h2>Letter</h2>
          </div>

          <div className='space-y-2'>
            <button id="letter"
              className="bg-gray-600 min-w-max text-xs hover:bg-gray-700 py-4 px-4 mx-4  my-2 rounded-md">Create
              Letter →</button>
            {/* <p className='infoText'>Change the ChatGPT Model to Use</p>
            <p className='infoText'>Messages are Stored in Firestore</p>
            <p className='infoText'>Hot Toast Notification When ChatGPT is Thinking</p> */}

          </div>
        </div>

        <div>
          <div className='flex flex-col items-center mb-5 '>
            {/* Sun Icon */}
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Write NDA</h2>
          </div>

          <div className='space-y-2'>
            <button id="nda"
              className="bg-gray-600 min-w-max text-xs hover:bg-gray-700 py-4 px-4 mx-4  my-2 rounded-md">Develop
              NDA →</button>
            {/* <p className='infoText'>May occassionally generate incorrect information</p>
            <p className='infoText'>May occassionally produce harmful instructions or biased content </p>
            <p className='infoText'>Limited knowledge of world and events after 2021</p> */}

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage