export default function handler(req, res) {
  if (req.method === 'POST') {
    // تحقق من التوقيع ثم نفّذ الأمر
    res.status(200).send('pong!');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
