"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  inStock: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

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

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/produto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 right-3">{product.category}</Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/produto/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" disabled={!product.inStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
        </Button>
      </CardFooter>
    </Card>
  )
}
