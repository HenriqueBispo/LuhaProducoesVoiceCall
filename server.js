import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const accountSid = process.env.SID_TWILIO;
const authToken = process.env.TOKEN_TWILIO;
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use("/audios", express.static(path.join(__dirname, "audios")));

const client = twilio(accountSid, authToken);

app.all("/twiml-audio", (req, res) => {
  try {
    const audioUrl = `https://rosella-aetiological-elfrieda.ngrok-free.dev/audios/audioTeste.mp3`;

    res.type("text/xml");
    res.send(`
      <Response>
        <Play>${audioUrl}</Play>
      </Response>
    `);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: err.message });
  }

});

app.post("/call-voice", async (req, res) => {
  const { to, from } = req.body;

  if (!to || !from) return res.status(400).json({ error: "Campos obrigatórios: to, from" });

  try {
    const call = await client.calls.create({
      to,
      from,
      url: `https://rosella-aetiological-elfrieda.ngrok-free.dev/twiml-audio`,
    });

    return res.json({ success: true, callSid: call.sid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/call-text", async (req, res) => {
  const { to, from, message } = req.body;

  if (!to || !from || !message) return res.status(400).json({ error: "Campos obrigatórios: to, from, message" });

  try {
    const call = await client.calls.create({
      to,
      from,
      twiml: `
        <Response>
          <Say voice="alice" language="pt-BR">
            ${message}
          </Say>
        </Response>
      `,
    });

    return res.json({ success: true, callSid: call.sid });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
  console.log("⚠️  Lembre-se: para Twilio acessar o áudio, use um túnel público (ngrok)");
});