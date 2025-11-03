import { Laptop, Monitor, Keyboard, Mouse, Cpu, HardDrive } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  { name: "Notebooks", icon: Laptop, href: "/categoria/notebooks" },
  { name: "Monitores", icon: Monitor, href: "/categoria/monitores" },
  { name: "Teclados", icon: Keyboard, href: "/categoria/teclados" },
  { name: "Mouses", icon: Mouse, href: "/categoria/mouses" },
  { name: "Processadores", icon: Cpu, href: "/categoria/processadores" },
  { name: "Armazenamento", icon: HardDrive, href: "/categoria/armazenamento" },
]

export function Categories() {
  return (
    <section className="container py-12 border-b">
      <h2 className="text-2xl font-bold mb-6">Categorias</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Link key={category.name} href={category.href}>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
