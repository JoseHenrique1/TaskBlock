'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

const axios = require("axios");
const url = 'http://127.0.0.1:5000/task/auth/create';

async function createUser(email, senha) {
    let data = {"email": email, "senha": senha};
    let resposta = await axios.post(url, data, ()=>{console.log("call back")})
    .then((response)=>{
            return response['data'];})
    .catch (()=>{
            return {msg:'erro'}})
    return resposta;
}



export default function Singup() {
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")

    //caso falhe o singup, irá emitir uma mensagem
    const [alertsing, setAlertsing] = useState(false)
    const route = useRouter()

    
    async function Enviar() {
        let key = await createUser(email, senha);
        
        if (key.msg == "success") {
            setAlertsing(false);
            route.push("/singin");
        }
        else {
            setAlertsing(true);
        }    
    }


    return (
        <main className="container d-flex flex-column">
            <Link href="/">Voltar</Link>
            <h1>Cadastro</h1>
            <div className="form-floating mb-3">
                <input
                    id="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <label for="email" >Email</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    id="senha"
                    className="form-control"
                    placeholder="senha"
                    value={senha}
                    onChange={(e)=>setSenha(e.target.value)}/>
                <label for="senha" >Senha</label>
            </div>
            
            

            <button 
                className="btn btn-primary"
                onClick={Enviar}>Send</button>

            {alertsing?
                <p>Campos vazios ou usuário existente!</p>
                :
                <></>}
        </main>
        
    )
}
