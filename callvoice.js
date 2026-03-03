import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const local = process.env.LOCAL;
const ip = process.env.IP
const port = process.env.PORT || 8080

async function callText() {
  try {
    const res = await axios.post(`http://${local}:${port}/call-text`, {
      to: "+5511972722346",
      from: process.env.PHONEFROM,
      message: "Olá teste, Lucca esta é uma automação de ligação"
    });

    console.log(res.data);
  } catch (error) {
    console.error(error.res?.data || error.message);
  }
}

async function callVoice() {
  try {
    const res = await axios.post(`http://${local}:${port}/call-voice`,
      {
        to: "+5511972722346",
        from: process.env.PHONEFROM,
        url: "http://145.223.94.117:8080/automacoes/audios/audioTeste.mp3"
      }
    )

    console.log(res.data);
  } catch (error) {
    console.error(error.res?.data || error.message);     
  }
}

callVoice()