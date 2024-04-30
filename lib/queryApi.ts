
import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    
    const res = await openai.chat.completions.create({
        model,     
        messages: [{role: "system", content: "You are an AI assistant"},
        { role: "user", content: prompt }],           
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    }).then(res => res.choices[0].message.content)
        .catch(
            (err) =>
                `CCLBot was unable to find an answer for that! (Error: ${err.
                    message})`
        )
        console.log('CCLBot CCLBot CCLBot')
        console.dir(res);        
        return res
    
}


export default query


// const query = async (input: string, chatId: string, onData: (chunk: string) => void): Promise<void> => {
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

//         while (true) {
//             const { done, value } = await reader.read();
//             if (done) {
//                 console.log('Stream has ended');
//                 break;
//             }

//             const chunk = new TextDecoder().decode(value);
//             console.log(chunk);
//             // onData(chunk);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw new Error(`CCLBot was UNABLE to find an answer for that! (Error: ${error})`);
//     }
// };

// export default query;