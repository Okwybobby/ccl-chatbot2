

import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    
    const res = await openai.completions.create({
        model,
        prompt,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    }).then(res => res.choices[0].text)
        .catch(
            (err) =>
                `CCLBot was unable to find an answer for that! (Error: ${err.
                    message})`
        )
        console.log('CCLBot CCLBot CCLBot')
        console.dir(res);
        // console.log(res.choices[0].text);
        return res
    
}


export default query