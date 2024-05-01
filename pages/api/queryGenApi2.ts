// const query = async (input: string, chatId: string): Promise<string> => {
//     try {
//         const response = await fetch('http://54.174.77.47/api/v1/chat/stream', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 sender_id: "1",
//                 conversation_id: "1",
//                 prompt: input,
//                 use_history: "false"
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch');
//         }

//         const reader = response.body?.getReader();
//         if (!reader) {
//             throw new Error('Response body is not readable');
//         }

//         let result = '';
//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) {
//                 console.log('Stream has ended');
//                 break;
//             }

//             // console.log(result);
//             // console.log(decoder.decode(value, { stream: true }));
//             console.log(new TextDecoder().decode(value));
//             result += new TextDecoder().decode(value);
//             // Update UI with streamed chunk
//             // Example: setMessages((prevMessages) => [...prevMessages, result]);
//         }

//         return result;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw new Error(`CCLBot was UNABLE to find an answer for that! (Error: ${error})`);
//     }
// };


const query = async (input: string, chatId: string, onChunkReceived?: (chunk: string) => void) => {
    console.log('OKWY....')
    try {
        const response = await fetch('http://54.174.77.47/api/v1/chat/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
            },
            body: JSON.stringify({
                sender_id: "1",
                conversation_id: "1",
                prompt: input,
                use_history: "false"
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Response body is not readable');
        }

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                console.log('Stream has ended');
                break;
            }

            const chunk = new TextDecoder().decode(value);
            if (onChunkReceived) {
                onChunkReceived(chunk);
            }
        }

        return ''; // Don't return the entire response
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error(`CCLBot was UNABLE to find an answer for that! (Error: ${error})`);
    }
};

export default query;
