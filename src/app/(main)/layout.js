'use client'
import Link from "next/link"
export default function Layout({ children }) {
  return (
    <body>
        <Link href="/">Voltar</Link>
        {children}
    </body>
      
  )
}
