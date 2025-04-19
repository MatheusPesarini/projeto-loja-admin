import { cookies } from 'next/headers';
import { verifySession } from './session';

export async function isAuthenticated() {
	try {
		const cookie = (await cookies()).get('authToken')?.value;

		if (!cookie) {
			return false;
		}

		const session = await verifySession(cookie);
		return !!session?.vendorId;
	} catch (error) {
		console.error('Erro ao verificar autenticação:', error);
		return false;
	}
}
