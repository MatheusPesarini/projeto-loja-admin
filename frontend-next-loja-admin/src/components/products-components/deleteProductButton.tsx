'use client';

import { Button } from '../ui/button';
import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitDeleteProduct } from '@/lib/actions/product/delete-product';

const initialState = {
	success: false,
	message: '',
	errors: {},
};

export default function DeleteProductButton({
	productName,
}: {
	productName: string;
}) {
	const router = useRouter();

	const [state, formAction, isPending] = useActionState(
		submitDeleteProduct,
		initialState,
	);

	useEffect(() => {
		if (state?.success) {
			setTimeout(() => {
				router.refresh();
			}, 300);
		}
	}, [state?.success, router]);

	return (
		<form action={formAction}>
			<input type="hidden" name="productName" value={productName} />
			<Button
				className="bg-red-500 hover:bg-red-700 text-white font-bold rounded cursor-pointer size-sm"
				type="submit"
			>
				<span>Remover</span>
			</Button>
		</form>
	);
}
