'use client'
import Link from "next/link"
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalContext } from "@/context/GlobalContext";

const axios = require("axios");
const url = 'http://127.0.0.1:5000/task/auth/connect';

async function getUser(email, senha) {
    let data = {"email": email, "senha": senha};
    let resposta = await axios.post(url, data,()=>{console.log('call back')})
    .then((response)=>{
            return response['data'];})
    .catch ((erro)=>{
            console.log(erro)
            return {msg:'error'};})
    return resposta;
}



export default function Singin() {
    const {setUser} = useContext(GlobalContext);

    const [senha, setSenha] = useState("");
    const [email, setEmail] = useState("");

    //caso falhe o singup, irá emitir uma mensagem
    const [alertsing, setAlertsing] = useState(false);
    const route = useRouter();

    async function Enviar() {
        if ((senha==="") || (email==="")) {
            setAlertsing(true)
        } 
        else {
            setAlertsing(false)
            let key = await getUser(email, senha);
            if (key.msg=='error') {
                alert("senha email errada")
            }
            else {
                setUser(key.key_user);
                localStorage.setItem("user", key.key_user)

                route.push("/home");       
            }
        }   
    }

    return (
        <main className="container d-flex flex-column ">
            <Link href="/">Voltar</Link>
            <h1>Login</h1>
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
                onClick={Enviar}
            >Send</button>

            {alertsing?
                    <p>Campos vazios ou email/senha errados!</p>
                    :
                    <></>
            }
            
        </main>
        
    )
}
