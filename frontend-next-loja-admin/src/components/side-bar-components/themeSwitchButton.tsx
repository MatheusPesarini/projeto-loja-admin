'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				size="icon"
				disabled
				className="w-auto p-0 cursor-pointer"
				aria-label="Alternar tema"
			/>
		);
	}

	return (
		<Button
			size="icon"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			aria-label="Alternar tema"
			className="w-auto p-0 cursor-pointer"
		>
			<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
