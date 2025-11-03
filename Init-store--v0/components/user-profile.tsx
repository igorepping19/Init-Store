"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { User, Package, MapPin, CreditCard, LogOut } from "lucide-react"

interface UserProfileProps {
  user: {
    name: string
    email: string
  }
  onLogout: () => void
}

export function UserProfile({ user, onLogout }: UserProfileProps) {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Minha Conta</h1>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>Seus dados cadastrais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <Separator />
              <Button variant="outline" className="w-full bg-transparent">
                Editar Informações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Meus Pedidos
              </CardTitle>
              <CardDescription>Acompanhe seus pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Você ainda não fez nenhum pedido</p>
              <Button variant="outline" className="w-full bg-transparent">
                Ver Histórico
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereços
              </CardTitle>
              <CardDescription>Gerencie seus endereços de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Nenhum endereço cadastrado</p>
              <Button variant="outline" className="w-full bg-transparent">
                Adicionar Endereço
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Formas de Pagamento
              </CardTitle>
              <CardDescription>Cartões salvos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">Nenhum cartão cadastrado</p>
              <Button variant="outline" className="w-full bg-transparent">
                Adicionar Cartão
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
