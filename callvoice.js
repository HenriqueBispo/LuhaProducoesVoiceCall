import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function enviarLigacao() {
  try {
    const res = await axios.post("http://145.223.94.117:8080/call-text", {
      to: "+5511972722346",
      from: process.env.PHONEFROM,
      message: "Olá teste"
    });

    console.log(res.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}

enviarLigacao();