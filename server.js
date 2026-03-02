import express from "express";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.SID_TWILIO;
const authToken = process.env.TOKEN_TWILIO;
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const client = twilio(accountSid, authToken);

async function dispararLigacao(to, from, message) {
  return await client.calls.create({
    twiml: `
      <Response>
        <Say voice="Polly.Camila" language="pt-BR">
          ${message}
        </Say>
      </Response>
    `,
    to,
    from
  });
}

app.post("/call-text", async (req, res) => {
  try {
    const { to, from, message } = req.body;

    if (!to || !from || !message) {
      return res.status(400).json({
        error: "Campos obrigatórios: to, from, message"
      });
    }

    const call = await dispararLigacao(to, from, message);

    return res.status(200).json({
      success: true,
      callSid: call.sid
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});