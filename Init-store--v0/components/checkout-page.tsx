"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone, Barcode } from "lucide-react"

export function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulação de processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    clearCart()
    setIsProcessing(false)

    toast({
      title: "Pedido realizado com sucesso!",
      description: "Você receberá um e-mail com os detalhes do pedido.",
    })

    router.push("/pedido-confirmado")
  }

  if (items.length === 0) {
    router.push("/carrinho")
    return null
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>1. Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Endereço de Entrega */}
            <Card>
              <CardHeader>
                <CardTitle>2. Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      name="cep"
                      placeholder="00000-000"
                      value={formData.cep}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço *</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Número *</Label>
                    <Input id="number" name="number" value={formData.number} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" name="complement" value={formData.complement} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="UF"
                      maxLength={2}
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forma de Pagamento */}
            <Card>
              <CardHeader>
                <CardTitle>3. Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5" />
                      <span>Cartão de Crédito</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Smartphone className="h-5 w-5" />
                      <span>PIX</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Barcode className="h-5 w-5" />
                      <span>Boleto Bancário</span>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nome no Cartão *</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Validade *</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV *</Label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="000"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="bg-secondary p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      Após confirmar o pedido, você receberá o código PIX para pagamento
                    </p>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="bg-secondary p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">O boleto será gerado após a confirmação do pedido</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        {(item.price * item.quantity).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      {total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-green-600">Grátis</span>
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

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? "Processando..." : "Finalizar Pedido"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ao finalizar, você concorda com nossos termos e condições
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
