'use client'

import { GlobalProvider } from "@/context/GlobalContext"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalProvider>
        {children}
      </GlobalProvider>
    </html>
  )
}
