import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechStore - Sua Loja de Informática",
  description: "Os melhores produtos de tecnologia com os melhores preços",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
