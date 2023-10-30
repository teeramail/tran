// middleware/my-endpoint.ts
import { IncomingRequest, ServerResponse } from 'nuxt'

export async function myEndpoint(req: IncomingRequest, res: ServerResponse) {
  if (req.method === 'POST') {
    // Retrieve the data from the request body
    const requestData = await req.json()

    // Log the incoming request data and timestamp
    console.log('Request received at:', new Date().toISOString())
    console.log('Request data:', requestData)

    // Process the data and send a response
    res.status(200).json({ message: 'Data received', data: requestData })
  } else {
    // Handle non-POST requests
    res.status(405).json({ error: 'Method not allowed' })
  }
}
