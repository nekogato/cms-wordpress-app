import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import Pusher from 'pusher'

const pusher = new Pusher({
    appId: "1582641",
    key: "a2eefaf59d574e46fce6",
    secret: "5650eba553c9a3ede8d8",
    cluster: "ap3",
    useTLS: true
});

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  await pusher.trigger("chat", "message", {
      username: req.body.username,
      message: req.body.message
  });

  res.json([]);
}