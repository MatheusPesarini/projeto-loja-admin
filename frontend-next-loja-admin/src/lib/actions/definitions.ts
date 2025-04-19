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
		.regex(/^\d{14}$/, { message: 'O CNPJ deve conter apenas números.' })
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
	name: z.string(),
	price: z.number(),
	description: z.string(),
	category: z.string(),
	quantity: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	image: z.string().url(),
});

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

export type SessionPayload = {
	vendorId: string;
	expiresAt: Date;
};
