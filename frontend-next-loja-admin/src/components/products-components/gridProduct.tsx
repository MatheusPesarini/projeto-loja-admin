import { Product } from "@/lib/actions/definitions";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import UpdateProductButton from "./updateProductModal";

export default function GridProduct({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product: Product) => (
        <Card key={product.vendorId} className="overflow-hidden">
          {' '}
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              {' '}
              <Image
                src={product.image || '/placeholder-image.png'} // Forneça uma imagem placeholder
                alt={product.productName}
                fill
                className="rounded-t-lg object-cover" // Adicione object-cover aqui
              // Opcional: adicione tratamento de erro ou placeholder enquanto carrega
              // onError={(e) => e.currentTarget.src = '/placeholder-image.png'}
              />
            </div>
          </CardHeader>
          <CardContent className="">
            {' '}
            {/* Conteúdo principal do card */}
            <CardTitle className="mb-1 text-lg just">{product.productName}</CardTitle>
            <CardDescription className="text-base font-semibold text-primary justify-between flex items-center">
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
              <UpdateProductButton />
            </CardDescription>
          </CardContent>
          {/* <CardFooter className="p-4 pt-0"> */}
          {/* Adicione botões de ação aqui se necessário (ex: Editar, Ver Detalhes) */}
          {/* <Button variant="outline" size="sm">Editar</Button> */}
          {/* </CardFooter> */}
        </Card>
      ))}
    </div>
  )
}