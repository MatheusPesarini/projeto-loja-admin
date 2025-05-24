'use server';

import { getVendorId } from '@/lib/session/get-vendor-id';
import {
	FileSchema,
	ProductFormState,
	ProductFormSchema,
} from '../definitions';

export async function submitProduct(
	prevState: ProductFormState | undefined,
	data: FormData,
): Promise<ProductFormState> {
	const vendorId = await getVendorId();

	if (!vendorId) {
		return {
			errors: { _form: ['Erro ao obter o ID do vendedor.'] },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}
	// console.log('ID do vendedor:', vendorId);

	const validatedFields = ProductFormSchema.safeParse({
		productName: data.get('productName'),
		brand: data.get('brand'),
		model: data.get('model'),
		category: data.get('category'),
		genre: data.get('genre'),
		warranty: data.get('warranty'),
		weight: data.get('weight'),
		quantity: data.get('quantity'),
		originalPrice: data.get('originalPrice'),
		discount: data.get('discount'),
		description: data.get('description'),
		vendorId: vendorId,
	});

	const imageFile = data.get('image');
	const validatedImage = FileSchema.safeParse(imageFile);

	if (!validatedFields.success) {
		console.log(
			'Erro: Falha na validação dos campos.',
			validatedFields.error.flatten(),
		);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}
	if (!validatedImage.success) {
		console.log(
			'Erro: Falha na validação da imagem.',
			validatedImage.error.flatten(),
		);
		return {
			errors: { image: validatedImage.error.flatten().formErrors },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}

	console.log('Validações passaram. Tentando upload da imagem...');

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

		console.log('Upload da imagem concluído. Tentando criar produto...');

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
		let discountedPrice = 0;
		if (
			validatedFields.data.discount !== 0 &&
			validatedFields.data.discount !== undefined
		) {
			discountedPrice = parseFloat(
				(
					(validatedFields.data.originalPrice as number) *
					(1 - (validatedFields.data.discount as number) / 100)
				).toFixed(2),
			);
		}

		const validatedFieldsWithImage = {
			...validatedFields.data,
			discountedPrice,
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

		const productResult = await productResponse.json();

		if (!productResponse.ok) {
			const deletedImage = fetch('http://localhost:4000/delete-image', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ imageUrl }),
			});

			if (!(await deletedImage).ok) {
				console.error('Erro ao deletar a imagem');
			} else {
				console.log('Imagem deletada com sucesso.');
			}

			return {
				errors: { _form: [productResult.message] },
				message: 'Erro ao criar o produto. Tente novamente.',
				success: false,
			};
		}

		return {
			message: productResult.message,
			success: true,
			errors: {},
		};
	} catch (error) {
		console.error('Erro ao criar o produto:', error);

		const deletedImage = fetch('http://localhost:4000/delete-image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ imageUrl }),
		});

		if (!(await deletedImage).ok) {
			console.error('Erro ao deletar a imagem');
		} else {
			console.log('Imagem deletada com sucesso.');
		}

		return {
			errors: { _form: ['Erro ao criar o produto.'] },
			message: 'Erro de validação. Verifique os campos destacados.',
			success: false,
		};
	}
}
