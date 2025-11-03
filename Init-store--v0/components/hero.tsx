import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-secondary">
      <div className="container flex flex-col md:flex-row items-center gap-8 py-16 md:py-24">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Tecnologia de ponta para você</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-xl">
            Encontre os melhores notebooks, desktops, periféricos e componentes com preços imbatíveis e entrega rápida.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="#produtos">Ver Produtos</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ofertas">Ofertas Especiais</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 relative">
          <img src="/modern-gaming-computer-setup-with-rgb-lights.jpg" alt="Setup de computador moderno" className="rounded-lg shadow-2xl" />
        </div>
      </div>
    </section>
  )
}
