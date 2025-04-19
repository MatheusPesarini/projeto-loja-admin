'use client';

import { useAuth } from '@/context/AuthContext';
import { submitLogout } from '@/lib/actions/auth/postLogout';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const router = useRouter();
	const { setIsAuthenticated } = useAuth();

	const handleLogout = async () => {
		try {
			await submitLogout();
			setIsAuthenticated(false);
			router.push('/login');
		} catch (error) {
			console.error('Erro ao fazer logout', error);
		}
	};

	return (
		<LogOut type="button" onClick={handleLogout}/>
	);
}
