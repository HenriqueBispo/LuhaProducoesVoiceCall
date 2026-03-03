import axios from "axios";
import dotenv from 'dotenv'
dotenv.config({ path: "./../.env" });

const INSTANCIA = process.env.INSTANCIA
const TOKEN = process.env.TOKEN
const CLIENTTOKEN = process.env.ClientToken

console.log(INSTANCIA, TOKEN, CLIENTTOKEN)

const res = axios.post(`https://api.z-api.io/instances/${INSTANCIA}}/token/${TOKEN}}/send-image`, {
        phone: "5511972722346",
        image: "https://imgs.search.brave.com/rgW_ru6Fb6P9CZ-sw5OlxpN8JdylEveYe2_X0_KdYrg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE3/MjYyMDcwNzQwODEt/N2UwYWNkMDczMTI1/P2l4bGliPXJiLTQu/MS4wJml4aWQ9TTN3/eE1qQTNmREI4TUh4/elpXRnlZMmg4Tkh4/OFpXUnBaaVZETXlW/QlJHTnBieVV5TUcx/aGFYTWxNakJpYjI1/cGRHOThaVzU4TUh4/OE1IeDhmREE9JmZt/PWpwZyZxPTYwJnc9/MzAwMA",
        caption: "Predio bonito",
        viewOnce: false
    }
)

console.log(res.data)