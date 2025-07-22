import { verifyKey } from 'discord-interactions';
import getRawBody from 'raw-body';

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

  // قراءة البيانات الخام من الطلب
  const rawBody = await getRawBody(req);

  // التحقق من التوقيع
  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.PUBLIC_KEY
  );

  if (!isValidRequest) {
    return res.status(401).send('Bad signature');
  }

  const body = JSON.parse(rawBody);

  // ✅ Discord Ping check (type === 1)
  if (body.type === 1) {
    return res.status(200).json({ type: 1 });
  }

  // 🎯 Slash Command: /ping
  if (body.type === 2 && body.data.name === 'ping') {
    return res.status(200).json({
      type: 4, // رد عام في القناة
      data: {
        content: '🏓 Pong! البوت شغّال على Vercel 🎉',
      },
    });
  }

  // 📌 لو تبغى تضيف أوامر إضافية:
  // if (body.type === 2 && body.data.name === 'hello') {
  //   ...
  // }
}
