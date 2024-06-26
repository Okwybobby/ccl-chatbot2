import { NextApiRequest, NextApiResponse } from "next"

type Data = {
    name: string
}

function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: 'John Doe'
})
}

export default handler