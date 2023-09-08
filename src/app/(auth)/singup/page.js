'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

const axios = require("axios");

const url = 'http://127.0.0.1:5000/task/auth/create';

//PAREI AQUI 
// funcao saind primiro que outra 
async function createUser(email, senha) {
    let data = {"email": email, "senha": senha};
    let resposta = "";
    await axios.post(url, data, ()=>{console.log("call back")})
    .then((response)=>{
            resposta = response['data'];
    })
    .catch (()=>{
            resposta = {msg:'erro'}
    })

    return resposta;
}



export default function Singup() {
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")
    const [alertsing, setAlertsing] = useState(false)
    const route = useRouter()

    
    async function Enviar() {
        let key = await createUser(email, senha);
        
        if (key.msg == "success") {
            route.push("/auth/singin");
        }
        else {
            alert("error")
            setAlertsing(true);
        }    
    }
    

    return (
        <main>
            <Link href="/">Voltar</Link>
            <h1>Cadastro</h1>
            <input
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
            <input
                placeholder="senha"
                value={senha}
                onChange={(e)=>setSenha(e.target.value)}/>

            <button onClick={Enviar}>Send</button>

            {alertsing?
                <p>Campos vazios ou usuário existente!</p>
                :
                <></>}

        </main>
        
    )
}
