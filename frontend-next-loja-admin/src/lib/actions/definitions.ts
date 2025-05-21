import { z } from 'zod';

export const LoginFormSchema = z.object({
	email: z
		.string()
		.email({ message: 'Por favor digite um e-mail válido.' })
		.trim(),
	password: z
		.string()
		.min(1, { message: 'Precisa ter 1 caractér no minímo' })
		.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Contain at least one special character.',
		})
		.trim(),
});

export const RegisterFormSchema = z.object({
	companyName: z
		.string()
		.min(1, { message: 'Por favor digite o nome da sua empresa.' })
		.max(50, {
			message: 'O nome da sua empresa deve ter no máximo 50 caracteres.',
		})
		.trim(),
	cnpj: z
		.string()
		.min(1, { message: 'Por favor digite o CNPJ da sua empresa.' })
		.max(14, { message: 'O CNPJ deve ter 14 caracteres.' })
		.regex(/^\d{14}$/, { message: 'O CNPJ deve conter 14 números.' })
		.trim(),
	email: z
		.string()
		.email({ message: 'Por favor digite um e-mail válido.' })
		.trim(),
	password: z
		.string()
		.min(1, { message: 'Precisa ter 1 caractér no minímo' })
		.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Contain at least one special character.',
		})
		.trim(),
});

export const ProductFormSchema = z.object({
	oldProductId: z.string().optional(),
	productName: z.string().min(1, {
		message: 'Por favor digite o nome do produto.',
	}).max(50, {
		message: 'O nome do produto deve ter no máximo 50 caracteres.',
	}).trim(),
	brand: z.string().min(1, {
		message: 'Por favor digite a marca do produto.',
	}).max(20, {
		message: 'A marca do produto deve ter no máximo 50 caracteres.',
	}).trim(),
	model: z.string().min(1, {
		message: 'Por favor digite o modelo do produto.',
	}).max(20, {
		message: 'O modelo do produto deve ter no máximo 50 caracteres.',
	}).trim(),
	category: z.string(),
	originalPrice: z.coerce.number().min(0, {
		message: 'O preço deve ser maior que 0.',
	}).max(999999, {
		message: 'O preço deve ser menor que 999999.',
	}).refine((value) => value > 0, {
		message: 'O preço deve ser maior que 0.',
	}),
	discountedPrice: z.coerce.number().min(0, {
		message: 'O preço com desconto deve ser maior que 0.',
	}).max(999999, {
		message: 'O preço com desconto deve ser menor que 999999.',
	}).refine((value) => value > 0, {
		message: 'O preço com desconto deve ser maior que 0.',
	}).optional(),
	discount: z.coerce.number().min(0, {
		message: 'O desconto deve ser maior ou igual a 0.',
	}).max(100, {
		message: 'O desconto deve ser menor ou igual a 100.',
	}).refine((value) => value >= 0, {
		message: 'O desconto deve ser maior ou igual a 0.',
	}).default(0),
	quantity: z.coerce.number().min(0, {
		message: 'A quantidade deve ser maior que 0.',
	}).max(999999, {
		message: 'A quantidade deve ser menor que 999999.',
	}).refine((value) => value > 0, {
		message: 'A quantidade deve ser maior que 0.',
	}),
	description: z.string().min(1, {
		message: 'Por favor digite a descrição do produto.',
	}).max(500, {
		message: 'A descrição do produto deve ter no máximo 500 caracteres.',
	}).trim(),
	vendorId: z.string(),
	image: z.string().optional()
});

export const ImageSchema = z.object({
	image: z.string(),
});

export const DeleteFormSchema = z.object({
	productName: z.string(),
});

export const FileSchema = z
	.instanceof(File, { message: 'É necessário enviar uma imagem.' })
	.refine((file) => file.size > 0, 'A imagem não pode estar vazia.')
	.refine(
		(file) => file.size <= 5 * 1024 * 1024,
		`O tamanho máximo da imagem é 5MB.`,
	)
	.refine(
		(file) =>
			['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(
				file.type,
			),
		'Formato de imagem inválido. Use JPG, PNG, WEBP ou GIF.',
	);

export type Product = z.infer<typeof ProductFormSchema>;

export type LoginFormState = {
	errors?: {
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	message?: string;
	success: boolean;
	isAuthenticated?: boolean;
};

export type RegisterFormState = {
	errors?: {
		companyName?: string[];
		cnpj?: string[];
		email?: string[];
		password?: string[];
		_form?: string[];
	};
	message?: string;
	success: boolean;
};

export type ProductFormState = {
	errors?: {
		productName?: string[];
		brand?: string[];
		model?: string[];
		category?: string[];
		quantity?: string[];
		originalPrice?: string[];
		discountedPrice?: string[];
		discount?: string[];
		description?: string[];
		image?: string[];
		_form?: string[];
	};
	message?: string;
	success: boolean;
	products?: Product[];
};

export type DeleteFormState = {
	errors?: {
		productName?: string[];
		_form?: string[];
	};
	message?: string;
	success: boolean;
}

export type SessionPayload = {
	vendorId: string;
	expiresAt: Date;
};
