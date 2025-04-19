'use client';

import Link from 'next/link';
import LogoutButton from '../logoutButton/logoutButton';
import Image from 'next/image';

export default function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
    if (!isAuthenticated) {
        return null;
    }

    return (
        <header className="flex py-2 px-4 bg-gray-800 text-white">
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                <h1>Teste</h1>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <Link href={'/shopProducts'}>Produtos</Link>
                        </li>
                        <li>
                            <Link href={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li>
                            <LogoutButton />
                        </li>
                        <li>
                            <Image
                                src="https://avatar.vercel.sh/default"
                                alt="Avatar"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}