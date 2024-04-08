import React from 'react'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
// import Chat from "@/components/Chat";

function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center 
    h-screen px-2 text-white'>
      <h1 className='text-xl font-bold mb-20 text-center'>CCL Chatbot</h1>

      <div className='flex text-xs space-x-2 text-center'>
        <div>
          <div className='flex flex-col items-center mb-5 justify-center'>
            {/* Sun Icon */}
            <SunIcon className="h-8 w-8" />
            <h2>Proposal</h2>
          </div>

          <div className='space-y-2'>
            <button id="proposal"
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