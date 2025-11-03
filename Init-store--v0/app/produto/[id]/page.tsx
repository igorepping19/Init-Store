import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"

// Mock data - em produção viria de uma API ou banco de dados
const products = [
  {
    id: "1",
    name: "Notebook Gamer RTX 4060",
    price: 5499.99,
    image: "/high-performance-gaming-laptop-with-rgb-keyboard.jpg",
    category: "Notebooks",
    description:
      "Notebook gamer de alta performance com processador Intel Core i7 de última geração, 16GB de RAM DDR5, placa de vídeo NVIDIA RTX 4060 e SSD NVMe de 512GB. Ideal para jogos AAA e trabalhos pesados.",
    inStock: true,
    specs: [
      "Processador: Intel Core i7-13700H",
      "Memória RAM: 16GB DDR5",
      "Placa de Vídeo: NVIDIA RTX 4060 8GB",
      "Armazenamento: SSD 512GB NVMe",
      'Tela: 15.6" Full HD 144Hz',
      "Sistema: Windows 11 Home",
    ],
  },
  {
    id: "2",
    name: 'Monitor 27" 144Hz',
    price: 1299.99,
    image: "/curved-gaming-monitor-27-inch-144hz.jpg",
    category: "Monitores",
    description:
      "Monitor gamer curvo de 27 polegadas com taxa de atualização de 144Hz, resolução QHD e tecnologia IPS para cores vibrantes e ângulos de visão amplos.",
    inStock: true,
    specs: [
      "Tamanho: 27 polegadas",
      "Resolução: 2560x1440 (QHD)",
      "Taxa de atualização: 144Hz",
      "Tempo de resposta: 1ms",
      "Painel: IPS",
      "Tecnologia: FreeSync Premium",
    ],
  },
  {
    id: "3",
    name: "Teclado Mecânico RGB",
    price: 349.99,
    image: "/mechanical-rgb-gaming-keyboard.jpg",
    category: "Teclados",
    description:
      "Teclado mecânico com switches blue, iluminação RGB totalmente personalizável e layout ABNT2. Perfeito para gamers e digitadores exigentes.",
    inStock: true,
    specs: [
      "Switch: Blue (clicky)",
      "Iluminação: RGB personalizável",
      "Layout: ABNT2",
      "Conexão: USB-C destacável",
      "Material: Alumínio escovado",
      "Anti-ghosting: Full N-Key Rollover",
    ],
  },
  {
    id: "4",
    name: "Mouse Gamer 16000 DPI",
    price: 199.99,
    image: "/ergonomic-gaming-mouse-with-rgb.jpg",
    category: "Mouses",
    description:
      "Mouse gamer ergonômico com sensor óptico de alta precisão, 8 botões programáveis e iluminação RGB. DPI ajustável até 16000.",
    inStock: true,
    specs: [
      "Sensor: Óptico 16000 DPI",
      "Botões: 8 programáveis",
      "Iluminação: RGB",
      "Conexão: USB com cabo trançado",
      "Peso: Ajustável",
      "Compatibilidade: Windows/Mac/Linux",
    ],
  },
  {
    id: "5",
    name: "Processador AMD Ryzen 7",
    price: 1899.99,
    image: "/amd-ryzen-processor-box.jpg",
    category: "Processadores",
    description:
      "Processador AMD Ryzen 7 de última geração com 8 núcleos e 16 threads, frequência boost de até 5.4GHz. Ideal para gaming e produtividade.",
    inStock: true,
    specs: [
      "Núcleos: 8",
      "Threads: 16",
      "Frequência base: 3.8GHz",
      "Frequência boost: 5.4GHz",
      "Cache: 32MB L3",
      "TDP: 105W",
    ],
  },
  {
    id: "6",
    name: "SSD NVMe 1TB",
    price: 449.99,
    image: "/nvme-ssd-1tb-storage-drive.jpg",
    category: "Armazenamento",
    description:
      "SSD NVMe PCIe 4.0 de 1TB com velocidades de leitura de até 7000MB/s. Perfeito para reduzir tempos de carregamento em jogos e aplicações.",
    inStock: true,
    specs: [
      "Capacidade: 1TB",
      "Interface: PCIe 4.0 x4 NVMe",
      "Leitura: até 7000MB/s",
      "Gravação: até 5000MB/s",
      "Formato: M.2 2280",
      "Garantia: 5 anos",
    ],
  },
  {
    id: "7",
    name: "Placa de Vídeo RTX 4070",
    price: 3999.99,
    image: "/nvidia-rtx-graphics-card.jpg",
    category: "Placas de Vídeo",
    description:
      "Placa de vídeo NVIDIA GeForce RTX 4070 com 12GB de memória GDDR6X, suporte a Ray Tracing e DLSS 3 para máxima performance em jogos.",
    inStock: true,
    specs: [
      "GPU: NVIDIA GeForce RTX 4070",
      "Memória: 12GB GDDR6X",
      "CUDA Cores: 5888",
      "Boost Clock: 2.5GHz",
      "Tecnologias: Ray Tracing, DLSS 3",
      "Conectores: 3x DisplayPort, 1x HDMI",
    ],
  },
  {
    id: "8",
    name: "Headset Gamer 7.1",
    price: 299.99,
    image: "/gaming-headset-with-microphone.jpg",
    category: "Áudio",
    description:
      "Headset gamer com som surround 7.1, microfone removível com cancelamento de ruído e iluminação RGB. Conforto para longas sessões de jogo.",
    inStock: true,
    specs: [
      "Som: Surround 7.1 virtual",
      "Drivers: 50mm",
      "Microfone: Removível com cancelamento de ruído",
      "Conexão: USB",
      "Iluminação: RGB",
      "Compatibilidade: PC, PS4, PS5",
    ],
  },
]

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}
