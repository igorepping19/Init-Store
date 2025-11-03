"use client"

import { ProductCard } from "@/components/product-card"

// Mock data - em produção viria de uma API ou banco de dados
const products = [
  {
    id: "1",
    name: "Notebook Gamer RTX 4060",
    price: 5499.99,
    image: "/high-performance-gaming-laptop-with-rgb-keyboard.jpg",
    category: "Notebooks",
    description: "Intel Core i7, 16GB RAM, RTX 4060, 512GB SSD",
    inStock: true,
  },
  {
    id: "2",
    name: 'Monitor 27" 144Hz',
    price: 1299.99,
    image: "/curved-gaming-monitor-27-inch-144hz.jpg",
    category: "Monitores",
    description: "QHD, IPS, 1ms, FreeSync Premium",
    inStock: true,
  },
  {
    id: "3",
    name: "Teclado Mecânico RGB",
    price: 349.99,
    image: "/mechanical-rgb-gaming-keyboard.jpg",
    category: "Teclados",
    description: "Switch Blue, RGB Personalizável, ABNT2",
    inStock: true,
  },
  {
    id: "4",
    name: "Mouse Gamer 16000 DPI",
    price: 199.99,
    image: "/ergonomic-gaming-mouse-with-rgb.jpg",
    category: "Mouses",
    description: "Sensor óptico, 8 botões programáveis, RGB",
    inStock: true,
  },
  {
    id: "5",
    name: "Processador AMD Ryzen 7",
    price: 1899.99,
    image: "/amd-ryzen-processor-box.jpg",
    category: "Processadores",
    description: "8 núcleos, 16 threads, 5.4GHz boost",
    inStock: true,
  },
  {
    id: "6",
    name: "SSD NVMe 1TB",
    price: 449.99,
    image: "/nvme-ssd-1tb-storage-drive.jpg",
    category: "Armazenamento",
    description: "Leitura 7000MB/s, PCIe 4.0",
    inStock: true,
  },
  {
    id: "7",
    name: "Placa de Vídeo RTX 4070",
    price: 3999.99,
    image: "/nvidia-rtx-graphics-card.jpg",
    category: "Placas de Vídeo",
    description: "12GB GDDR6X, Ray Tracing, DLSS 3",
    inStock: true,
  },
  {
    id: "8",
    name: "Headset Gamer 7.1",
    price: 299.99,
    image: "/gaming-headset-with-microphone.jpg",
    category: "Áudio",
    description: "Som surround, Microfone removível, RGB",
    inStock: true,
  },
]

export function ProductGrid() {
  return (
    <div id="produtos" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
