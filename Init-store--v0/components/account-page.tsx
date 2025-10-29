"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { UserProfile } from "@/components/user-profile"

export function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleLogin = (email: string, password: string) => {
    // Simulação de login - em produção, isso seria uma chamada de API
    setUser({ name: "João Silva", email })
    setIsLoggedIn(true)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulação de registro - em produção, isso seria uma chamada de API
    setUser({ name, email })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  if (isLoggedIn && user) {
    return <UserProfile user={user} onLogout={handleLogout} />
  }

  return (
    <div className="container py-16 max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Minha Conta</CardTitle>
          <CardDescription>Entre ou crie sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onLogin={handleLogin} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onRegister={handleRegister} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
