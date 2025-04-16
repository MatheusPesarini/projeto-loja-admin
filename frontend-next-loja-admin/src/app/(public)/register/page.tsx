'use client';

import { submitRegister } from '@/lib/actions/auth/postRegister';
import type { RegisterFormState } from '@/lib/actions/definitions';
import { useActionState } from 'react';

import FormInput from '@/components/formInput/formInput';
import { useRouter } from 'next/navigation';

const initialState = {
	errors: {},
	message: '',
} as RegisterFormState;

export default function Register() {
  const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		submitRegister,
		initialState,
	);

	return (
		<div className="flex flex-col items-center mt-10">
			<h1 className="font-bold mb-5">Cadastro</h1>
			{state?.message && <p className="text-red-500 mb-4">{state.message}</p>}{' '}
			<form className="flex flex-col items-center" action={formAction}>
				<FormInput
					label="Nome da Empresa"
					name="companyName"
					type="text"
					placeholder="Digite o nome da sua Empresa"
					errors={state?.errors?.companyName}
					required
        />
        
        <FormInput
					label="CNPJ"
					name="cnpj"
					type="text"
					placeholder="Digite o CNPJ da sua Empresa"
					errors={state?.errors?.cnpj}
					required
				/>

				<FormInput
					label="E-mail"
					name="email"
					type="email"
					placeholder="Digite seu e-mail"
					errors={state?.errors?.email}
					required
				/>

				<FormInput
					label="Senha"
					name="password"
					type="password"
					placeholder="Digite seu senha"
					errors={state?.errors?.password}
					required
				/>

				<button
					type="submit"
					disabled={isPending}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isPending ? 'Enviando...' : 'Cadastrar'}
        </button>
        
        <button type='button' onClick={() => router.push('/')} className="mt-4 text-blue-500 hover:underline">
          Logar-se
        </button>
			</form>
		</div>
	);
}
