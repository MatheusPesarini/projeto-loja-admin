'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET_KEY || 'YOUR_SECRET_KEY',
);

export async function getVendorId(): Promise<string | null> {
	const cookiesStore = await cookies();
	const token = cookiesStore.get('authToken')?.value;

	if (!token) {
		return null;
	}

	try {
		const { payload } = await jwtVerify<{
			vendorId?: string;
			expiresAt?: number;
		}>(token, JWT_SECRET);
		if (payload && typeof payload.vendorId === 'string') {
			return payload.vendorId;
		}
		return null;
	} catch (error) {
		console.error('Error verifying token:', error);
		return null;
	}
}
