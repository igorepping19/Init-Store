"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xl font-bold">TechStore</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Produtos
            </Link>
            <Link href="/ofertas" className="text-sm font-medium hover:text-primary transition-colors">
              Ofertas
            </Link>
            <Link href="/categorias" className="text-sm font-medium hover:text-primary transition-colors">
              Categorias
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center gap-4 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Buscar produtos..." className="pl-9" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="hidden md:flex">
            <Link href="/conta">
              <User className="h-5 w-5" />
              <span className="sr-only">Minha conta</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/carrinho">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Produtos
                </Link>
                <Link href="/ofertas" className="text-lg font-medium hover:text-primary transition-colors">
                  Ofertas
                </Link>
                <Link href="/categorias" className="text-lg font-medium hover:text-primary transition-colors">
                  Categorias
                </Link>
                <Link href="/conta" className="text-lg font-medium hover:text-primary transition-colors">
                  Minha Conta
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
