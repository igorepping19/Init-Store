"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Truck, Shield, CreditCard } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  inStock: boolean
  specs?: string[]
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    router.push("/carrinho")
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <Badge className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="text-sm text-muted-foreground">à vista</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1" onClick={handleBuyNow} disabled={!product.inStock}>
              Comprar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Adicionar ao Carrinho
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Frete Grátis</p>
                <p className="text-xs text-muted-foreground">Sul e Sudeste</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Garantia</p>
                <p className="text-xs text-muted-foreground">12 meses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Parcelamento</p>
                <p className="text-xs text-muted-foreground">Em até 12x</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product.specs && product.specs.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Especificações Técnicas</h2>
            <ul className="grid md:grid-cols-2 gap-3">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
