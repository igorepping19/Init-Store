import { ProductGrid } from "@/components/product-grid"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Produtos em Destaque</h2>
        </div>
        <ProductGrid />
      </section>
    </div>
  )
}
