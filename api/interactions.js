import { verifyKey } from 'discord-interactions';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const rawBody = await getRawBody(req); // تحتاج مكتبة raw-body

  const isValid = verifyKey(rawBody, signature, timestamp, process.env.PUBLIC_KEY);

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  const json = JSON.parse(rawBody);

  if (json.type === 1) {
    return res.status(200).json({ type: 1 }); // PONG
  }

  // رد فعل أو أمر Slash
}
