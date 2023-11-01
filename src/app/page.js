'use client'

import Link from "next/link"

import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  
  return (
    <body className="container col ">
      <h1>Task Block</h1>
      <main className="bg-light d-flex flex-column justify-content-center">
        <Link href="/singin" className="btn btn-primary">Entrar</Link><br/>
        <Link href="/singup" className="btn btn-primary">Cadastrar-se</Link> 
      </main>     
    </body>
  )
}
