import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const local = process.env.LOCAL;
const ip = process.env.IP
const port = process.env.PORT || 8080

async function callText() {
  try {
    const res = await axios.post(`https://rosella-aetiological-elfrieda.ngrok-free.dev:/call-text`, {
      to: "+5511972722346",
      from: process.env.PHONEFROM,
      message: "Olá teste, Lucca esta é uma automação de ligação"
    });

    console.log(res.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

async function callVoice() {
  try {
    const res = await axios.post(`${ip}/call-voice`,
      {
        to: "+5511972722346",
        from: process.env.PHONEFROM,
        //audioUrl: "https://github.com/luhaprogramacao/audios/raw/refs/heads/main/teste2github.mp3"
        audioUrl: `https://github.com/luhaprogramacao/audios/raw/refs/heads/main/audioTeste.mp3`
      }
    )

    console.log(res.data);
  } catch (error) {
    console.error(error.response?.data || error.message); 
  }
}

async function sendtext() {
  const res = await axios.post(`${ip}/sendTextWhatsApp`,
    {
      to: "5511972722346",
      instancia: "3EF879F1563272D08FD05243EAACF34D",
      token: "BB79B8263797206357FDCDB6",
      ClientToken: "Fc17646ee6305441da06ad129a85d65cbS",
      message: "Mensagem"
    }
  )
}

callVoice();
sendtext();

console.log(callVoice);
console.log(sendtext);