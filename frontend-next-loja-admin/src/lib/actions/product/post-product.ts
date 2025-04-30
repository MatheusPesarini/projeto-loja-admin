import { ImageSchema, ProductFormState, ProductSchema } from '../definitions';

export async function submitProduct(
	prevState: ProductFormState | undefined,
	data: FormData,
): Promise<ProductFormState> {
	const validatedFields = ProductSchema.safeParse({
		name: data.get('name') as string,
		price: parseFloat(data.get('price') as string),
		discount: parseFloat(data.get('discount') as string),
		description: data.get('description') as string,
		category: data.get('category') as string,
		quantity: parseInt(data.get('quantity') as string),
	});
	const validatedImage = ImageSchema.safeParse({
		image: data.get('image') as string,
	})

	return [success: true, message: 'Produto criado com sucesso', errors: {}];
}
