import axios from "axios";
import dotenv from 'dotenv'
dotenv.config({ path: "./../.env" });

const INSTANCIA = process.env.INSTANCIA
const TOKEN = process.env.TOKEN
const CLIENTTOKEN = process.env.ClientToken

console.log(INSTANCIA, TOKEN, CLIENTTOKEN)

const res = await axios.post(`https://api.z-api.io/instances/${INSTANCIA}/token/${TOKEN}/send-text`, 
    { 
    phone: "5511972722346",
    message: "Mensagem de texto"
    }, 
    { 
        headers: {
            "client-token": CLIENTTOKEN
        } 
    }
);

console.log(res.data)