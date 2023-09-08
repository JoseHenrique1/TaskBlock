'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

const axios = require("axios");

//PAREI AQUI 
// esta dando erro no terminal...
//mas o site funciona de boa
function createUser(email, senha) {
    let url = 'http://127.0.0.1:5000/task/auth/create';
    let data = {"email": email, "senha": senha};
    axios.post(url, data, ()=>{console.log("call back")})

    .then((response)=>
    {
            console.log('post sucess')

            console.log(response['data'])
            console.log(response.status)

    })

    .catch (()=>
    {
            console.log('erro')
    })
    return true; //retorna algo não me lebro se é um bool
}



export default function Singin() {
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")

    const route = useRouter()

    
    

    function Enviar() {
        let key = createUser(email, senha)

        /*
        if (key==false) {
            alert("faltou algo...")
        }
        else {
            route.push("/auth/singin")
        }
        */
        
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
        </main>
        
    )
}
