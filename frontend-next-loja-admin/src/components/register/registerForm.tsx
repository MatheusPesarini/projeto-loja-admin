'use client';

import { submitRegister } from '@/lib/actions/auth/postRegister';
import { RegisterFormState } from '@/lib/actions/definitions';
import React, { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Link from 'next/link';

const initialState: RegisterFormState = {
	errors: {},
	message: '',
	success: false,
};

const formatCNPJ = (value: string): string => {
	if (!value) return '';
	const cnpj = value.replace(/\D/g, '');

	const limitedCNPJ = cnpj.slice(0, 14);
	const len = limitedCNPJ.length;

	if (len <= 2) {
		return limitedCNPJ;
	}
	if (len <= 5) {
		return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(2)}`;
	}
	if (len <= 8) {
		return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(
			2,
			5,
		)}.${limitedCNPJ.slice(5)}`;
	}
	if (len <= 12) {
		return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(
			2,
			5,
		)}.${limitedCNPJ.slice(5, 8)}/${limitedCNPJ.slice(8)}`;
	}
	return `${limitedCNPJ.slice(0, 2)}.${limitedCNPJ.slice(
		2,
		5,
	)}.${limitedCNPJ.slice(5, 8)}/${limitedCNPJ.slice(
		8,
		12,
	)}-${limitedCNPJ.slice(12)}`;
};

export default function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		submitRegister,
		initialState,
	);

	const [cnpjValue, setCNPJValue] = React.useState<string>('');

	const companyErrors = state?.errors?.companyName;
	const cnpjErrors = state?.errors?.cnpj;
	const emailErrors = state?.errors?.email;
	const passwordErrors = state?.errors?.password;
	const formErrors = state?.errors?._form;

	const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCNPJValue(formatCNPJ(event.target.value));
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="shadow-md">
				<CardHeader>
					<CardTitle className="text-2xl">Cadastro</CardTitle>
					<CardDescription>
						Digite seu dados para cadastro da sua conta.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={formAction} className="space-y-4">
						{' '}
						<div className="grid gap-2">
							<Label htmlFor="companyName">Nome da Empresa</Label>
							<Input
								type="text"
								id="companyName"
								name="companyName"
								required
								aria-describedby="company-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									companyErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="company-error" aria-live="polite" aria-atomic="true">
								{companyErrors &&
									companyErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="cnpj">CNPJ</Label>
							<Input
								type="text"
								id="cnpj"
								name="cnpj"
								value={cnpjValue}
								onChange={handleCNPJChange}
								placeholder="00.000.000/0001-00"
								maxLength={18}
								required
								aria-describedby="cnpj-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									cnpjErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="cnpj-error" aria-live="polite" aria-atomic="true">
								{cnpjErrors &&
									cnpjErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">E-mail</Label>
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="m@example.com"
								required
								aria-describedby="email-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									emailErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="email-error" aria-live="polite" aria-atomic="true">
								{emailErrors &&
									emailErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Senha</Label>
							<Input
								id="password"
								name="password"
								type="password"
								required
								aria-describedby="password-error"
								className={cn(
									'text-black bg-amber-50 w-full p-2 rounded border',
									passwordErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id="password-error" aria-live="polite" aria-atomic="true">
								{passwordErrors &&
									passwordErrors.map((error: string) => (
										<p className="mt-1 text-sm text-red-500" key={error}>
											{error}
										</p>
									))}
							</div>
						</div>
						{formErrors && (
							<div
								className="mt-2 text-sm text-red-500 text-center"
								aria-live="polite"
							>
								{formErrors.map((error: string) => (
									<p key={error}>{error}</p>
								))}
							</div>
						)}
						{state?.message && !state.success && (
							<div
								className="mt-2 text-sm text-red-500 text-center"
								aria-live="polite"
							>
								{state.message}
							</div>
						)}
						<Button
							type="submit"
							disabled={isPending}
							className="w-full cursor-pointer shadow-md"
						>
							{isPending ? 'Enviando...' : 'Cadastrar'}
						</Button>
						<div className="mt-4 text-center text-sm">
							Já tem uma conta?{' '}
							<Link
								href={'/'}
								className="underline underline-offset-4 cursor-pointer"
							>
								Logar-se
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
