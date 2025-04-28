'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function submitLogout() {
	(await cookies()).delete('authToken');

	console.log('Logout realizado com sucesso');

	revalidatePath('/', 'layout');
	redirect('/');
}
