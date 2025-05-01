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

export const ProductSchema = z.object({
	id: z.string(),
	productName: z.string(),
	brand: z.string(),
	model: z.string(),
	category: z.string(),
	price: z.coerce.number(),
	discount: z.coerce.number(),
	quantity: z.coerce.number(),
	description: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	image: z.string().optional(),
});

export const ImageSchema = z.object({
	image: z.string(),
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

export type Product = z.infer<typeof ProductSchema>;

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
		price?: string[];
		discount?: string[];
		description?: string[];
		image?: string[];
		_form?: string[];
	};
	message?: string;
	success: boolean;
};

export type SessionPayload = {
	vendorId: string;
	expiresAt: Date;
};
