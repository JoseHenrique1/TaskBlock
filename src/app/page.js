'use client'

import Link from "next/link"

export default function Home() {
  
  return (
    <body>
      <Link href="/home">Home</Link><br/>
      <Link href="/singin">Entrar</Link><br/>
      <Link href="/singup">Cadastrar-se</Link>      
    </body>
  )
}
