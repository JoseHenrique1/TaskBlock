'use client'
import Link from "next/link"

import { MainProvider } from "@/context/MainContext"

export default function Layout({ children }) {
  return (
    <body>
      <MainProvider>
        <Link href="/">Voltar</Link>
        {children}
      </MainProvider>  
    </body>
      
  )
}
