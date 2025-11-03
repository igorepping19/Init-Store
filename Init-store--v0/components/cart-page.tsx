"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Adicione produtos ao carrinho para continuar comprando
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Ver Produtos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-xl font-bold text-primary">
                      {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover</span>
                    </Button>

                    <div className="flex items-center gap-2 border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Resumo do Pedido</h2>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)
                  </span>
                  <span className="font-medium">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Finalizar Compra
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/">Continuar Comprando</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
