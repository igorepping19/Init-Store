import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PedidoConfirmado() {
  return (
    <div className="container py-16">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-16 gap-6">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-center">Pedido Confirmado!</h1>
          <p className="text-muted-foreground text-center max-w-md">
            Seu pedido foi realizado com sucesso. Você receberá um e-mail com os detalhes e o código de rastreamento em
            breve.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button asChild size="lg">
              <Link href="/">Continuar Comprando</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/conta">Ver Meus Pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
