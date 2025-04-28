import { ProductFormState, ProductSchema } from "../definitions";

export default function submitProduct(prevState: ProductFormState | undefined, data: FormData): ProductFormState {
  const validatedFields = ProductSchema.safeParse({
    name: data.get('name') as string,
    price: parseFloat(data.get('price') as string),
    description: data.get('description') as string,
    category: data.get('category') as string,
    quantity: parseInt(data.get('quantity') as string),
    image: data.get('image') as string,
  })

  
  return [success: true, message: 'Produto criado com sucesso', errors: {}];
}
