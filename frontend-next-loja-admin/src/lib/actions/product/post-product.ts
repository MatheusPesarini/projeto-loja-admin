import {
	FileSchema,
	ImageSchema,
	ProductFormState,
	ProductSchema,
} from '../definitions';

export async function submitProduct(
	prevState: ProductFormState | undefined,
	data: FormData,
): Promise<ProductFormState> {
	const validatedFields = ProductSchema.safeParse({
		name: data.get('name') as string,
		brand: data.get('brand') as string,
		model: data.get('model') as string,
		category: data.get('category') as string,
		quantity: parseInt(data.get('quantity') as string),
		price: parseFloat(data.get('price') as string),
		discount: parseFloat(data.get('discount') as string),
		description: data.get('description') as string,
	});

	const imageFile = data.get('image');
	const validatedImage = FileSchema.safeParse(imageFile);

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
		};

		const productResponse = await fetch('http://localhost:3001/product/post', {
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
