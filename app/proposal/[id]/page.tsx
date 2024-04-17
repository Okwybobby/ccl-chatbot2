import Chat from '../../../components/Chat'
import ChatInput from "../../../components/ChatInput"

type Props = {
  params: {
    id: string
  }
}


function ProposalPage({ params: { id } }: Props) {
  return (

    //    <div>PROPOSAL</div>
    <div className="text-white flex flex-col h-screen overflow-hidden">      
      <div className="right_proposal w-10/12 flex justify-start items-center flex-col">
            <div className="text-center w-full text-3xl font-bold my-10">
                CCL ChatBot - Proposal
            </div>

            <div style={{ padding: '1px' }}>
                <div className="itemsrow flex py-2 w-full justify-center px-32">
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Select All</label>
                    </div>

                    {/* Add more checkbox inputs and labels as needed */}
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">About CyperCrescent</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Our Team</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Our Commitment</label>
                    </div>                  
                </div>

                {/* Other parts of your HTML */}
                
            </div>

            <div style={{ padding: '1px' }}>
                <div className="itemsrow flex py-2 w-full justify-center px-32">
                
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Benefits</label>
                    </div>
                    
                    
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Executive Summary</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Our Clients</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="default-checkbox"
                            className="custom-label ml-2 mr-2 text-sm font-medium text-white-900 dark:text-gray-300">Overview</label>
                    </div>
                </div>

                {/* Other parts of your HTML */}
                
            </div>
            
        </div>

      <Chat chatId={id} />
      <ChatInput chatId={id} /> 
    </div>

  )
}

export default ProposalPage