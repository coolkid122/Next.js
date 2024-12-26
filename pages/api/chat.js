import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure you're using the Vercel environment variable
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4', // You can also use 'gpt-3.5-turbo'
        messages: [
          { role: 'user', content: message },
        ],
      });

      res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

