import { NextApiRequest, NextApiResponse } from "next"

type Data = {
    answer: string
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { prompt, chatId, model, session } = req.body

    if (!prompt) {
        res.status(400).json({
            answer: 'Please provide a prompt!'

        })
        return
    }

    if (!chatId) {
        res.status(400).json({
            answer: 'Please provide a valid chat ID!'
        })
        return
    }

    // ChatGPT Query
    const response = await (prompt, chatId, model)

        res.status(200).json({
            answer: 'John Doe'
        })
}

export default handler