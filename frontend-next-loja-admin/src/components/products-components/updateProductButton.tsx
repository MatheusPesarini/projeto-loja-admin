"use client";

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { submitUpdateProduct } from '@/lib/actions/product/patch-product';
import { Product } from '@/lib/actions/definitions';
import { useRouter } from 'next/navigation';

const initialState = {
  success: false,
  message: '',
  errors: {},
};

export default function UpdateProductButton({ product }: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    submitUpdateProduct,
    initialState,
  );


  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 300);
    }
  }, [state?.success, router]);


  const productNameErrors = state?.errors?.productName;
  const brandErrors = state?.errors?.brand;
  const modelErrors = state?.errors?.model;
  const categoryErrors = state?.errors?.category;
  const priceErrors = state?.errors?.originalPrice;
  const discountErrors = state?.errors?.discount;
  const quantityErrors = state?.errors?.quantity;
  const descriptionErrors = state?.errors?.description;
  const imageErrors = state?.errors?.image;
  const formErrors = state?.errors?._form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer size-sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Edite os dados do Produto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input type="hidden" name="productId" value={product.productName} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Nome
              </Label>
              <Input
                id="productName"
                type="text"
                name="productName"
                required
                defaultValue={product?.productName || ''}
                aria-describedby="productName-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  productNameErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="productName-error" aria-live="polite" aria-atomic="true">
                {productNameErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Marca
              </Label>
              <Input
                id="brand"
                type="text"
                name="brand"
                required
                defaultValue={product?.brand || ''}
                aria-describedby="brand-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  brandErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="brand-error" aria-live="polite" aria-atomic="true">
                {brandErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Modelo
              </Label>
              <Input
                id="model"
                type="text"
                name="model"
                required
                defaultValue={product?.model || ''}
                aria-describedby="model-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  modelErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="model-error" aria-live="polite" aria-atomic="true">
                {modelErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Input
                id="category"
                type="text"
                name="category"
                required
                defaultValue={product?.category || ''}
                aria-describedby="category-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  categoryErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="category-error" aria-live="polite" aria-atomic="true">
                {categoryErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Preço
              </Label>
              <Input
                id="price"
                type="text"
                name="price"
                required
                defaultValue={product?.originalPrice || ''}
                min={0}
                aria-invalid={priceErrors ? 'true' : 'false'}
                aria-describedby="price-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  priceErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="price-error" aria-live="polite" aria-atomic="true">
                {priceErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discountedPrice" className="text-right">
                Preço com desconto
              </Label>
              <Input
                id="discountedPrice"
                type="text"
                name="discountedPrice"
                readOnly
                disabled
                defaultValue={product?.discountedPrice || product?.originalPrice || ''}
                className={cn(
                  'text-black bg-gray-100 w-full p-2 rounded border cursor-not-allowed',
                  'border-gray-300'
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">
                Desconto
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="discount"
                  type="number"
                  name="discount"
                  required
                  defaultValue={product?.discount || ''}
                  min={0}
                  max={100}
                  step="0.01"
                  aria-invalid={discountErrors ? 'true' : 'false'}
                  aria-describedby="discount-error"
                  className={cn(
                    'text-black bg-amber-50 w-full p-2 rounded border',
                    discountErrors ? 'border-red-500' : 'border-gray-300',
                  )}
                />
                <span className="text-gray-500">%</span>
              </div>
              <div id="discount-error" aria-live="polite" aria-atomic="true">
                {discountErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantidade
              </Label>
              <Input
                id="quantity"
                type="text"
                name="quantity"
                required
                defaultValue={product?.quantity || ''}
                min={0}
                aria-describedby="quantity-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  quantityErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="quantity-error" aria-live="polite" aria-atomic="true">
                {quantityErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                type="text"
                name="description"
                required
                defaultValue={product?.description || ''}
                aria-describedby="description-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  descriptionErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="description-error" aria-live="polite" aria-atomic="true">
                {descriptionErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Imagem
              </Label>
              <Input
                id="image"
                type="file"
                name="image"
                aria-describedby="image-error"
                className={cn(
                  'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
                  productNameErrors ? 'border-red-500' : 'border-gray-300',
                )}
              />
              <div id="image-error" aria-live="polite" aria-atomic="true">
                {imageErrors?.map((error: string) => (
                  <p className="mt-1 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div id="form-error" aria-live="polite" aria-atomic="true">
              {formErrors?.map((error: string) => (
                <p className="mt-1 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
