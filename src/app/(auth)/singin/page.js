'use client'
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";

function getUser(email, senha) {
    return "12345"; //id do user no banco ou um valor NULL caso esteja errado
}



export default function Singin() {
    const [senha, setSenha] = useState("")
    const [email, setEmail] = useState("")

    const route = useRouter()

    
    

    function Enviar() {
        let key = getUser(email, senha)

        if (key==null) {
            alert("senha email errada")
        }
        else {
            route.push("/home")
        }
        
    }

    return (
        <main>
            <Link href="/">Voltar</Link>
            <h1>Login</h1>
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
