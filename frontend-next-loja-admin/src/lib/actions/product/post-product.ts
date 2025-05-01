'use server';

import { getVendorId } from '@/lib/session/get-vendor-id';
import { FileSchema, ProductFormState, ProductSchema } from '../definitions';

export async function submitProduct(
	prevState: ProductFormState | undefined,
	data: FormData,
): Promise<ProductFormState> {
	const vendorId = await getVendorId();

	const validatedFields = ProductSchema.safeParse({
		productName: data.get('productName'),
		brand: data.get('brand'),
		model: data.get('model'),
		category: data.get('category'),
		quantity: data.get('quantity'),
		price: data.get('price'),
		discount: data.get('discount'),
		description: data.get('description'),
		vendorId: vendorId,
	});

	const imageFile = data.get('image');
	const validatedImage = FileSchema.safeParse(imageFile);

	if (!vendorId) {
		return {
			errors: { _form: ['Erro ao obter o ID do vendedor.'] },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}
	if (!validatedImage.success) {
		return {
			errors: { image: validatedImage.error.flatten().formErrors },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}

	let imageUrl = '';
	try {
		console.log('Tentando fazer upload da imagem...');
		const imageFormData = new FormData();
		imageFormData.append('image', validatedImage.data);

		const imageUploadResponse = await fetch('http://localhost:4000/upload', {
			method: 'POST',
			body: imageFormData,
		});

		if (!imageUploadResponse.ok) {
			return {
				errors: { image: ['Erro ao fazer upload da imagem.'] },
				message: 'Erro de validação. Verifique os campos destacados.',
				success: false,
			};
		}

		const imageResult = await imageUploadResponse.json();
		imageUrl = imageResult.imageUrl;
	} catch (error: unknown) {
		console.error('Erro no upload da imagem:', error);
		return {
			errors: { image: ['Erro ao fazer upload da imagem.'] },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}

	try {
		const validatedFieldsWithImage = {
			...validatedFields.data,
			image: imageUrl,
			vendorId: vendorId,
		};

		const productResponse = await fetch('http://localhost:3001/product', {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(validatedFieldsWithImage),
		});

		if (!productResponse.ok) {
			const errorResponse = await productResponse.json();
			return {
				errors: { _form: [errorResponse.message] },
				message: 'Erro ao criar o produto. Tente novamente.',
				success: false,
			};
		}

		return {
			success: true,
			message: 'Produto criado com sucesso',
			errors: {},
		};
	} catch (error) {
		console.error('Erro ao criar o produto:', error);
		return {
			errors: { _form: ['Erro ao criar o produto.'] },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}
}
