'use client';

import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { submitUpdateProduct } from '@/lib/actions/product/patch-product';
import type { Product } from '@/lib/actions/definitions';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
	genreCategories,
	productCategoriesByGenre,
} from './utils/product-definition';

const initialState = {
	success: false,
	message: '',
	errors: {},
};

export default function UpdateProductButton({ product }: { product: Product }) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const [originalPrice, setOriginalPrice] = useState<number>(
		parseFloat(product?.originalPrice?.toString() || '0')
	);
	const [discount, setDiscount] = useState<number>(
		parseFloat(product?.discount?.toString() || '0')
	);
	const [finalPrice, setFinalPrice] = useState<number>(
		parseFloat(product?.discountedPrice?.toString() || '0')
	);

	const [selectedGenre, setSelectedGenre] = useState<string>(product?.genre || '');
	const [availableCategories, setAvailableCategories] = useState<
		Array<{ value: string; label: string }>
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>(product?.category || '');

	const [state, formAction, isPending] = useActionState(
		submitUpdateProduct,
		initialState,
	);

	useEffect(() => {
		if (originalPrice > 0 && discount >= 0 && discount <= 100) {
			const calculatedPrice = parseFloat(
				(originalPrice * (1 - discount / 100)).toFixed(2),
			);
			setFinalPrice(calculatedPrice);
		} else {
			setFinalPrice(originalPrice);
		}
	}, [originalPrice, discount]);

	useEffect(() => {
		if (selectedGenre && productCategoriesByGenre[selectedGenre]) {
			setAvailableCategories(productCategoriesByGenre[selectedGenre]);
		} else {
			setAvailableCategories([]);
		}
	}, [selectedGenre]);

	useEffect(() => {
		if (open && product?.genre && productCategoriesByGenre[product.genre]) {
			setAvailableCategories(productCategoriesByGenre[product.genre]);
		}
	}, [open, product?.genre]);

	useEffect(() => {
		if (state?.success) {
			setOpen(false);
			setTimeout(() => {
				router.refresh();
			}, 300);
		}
	}, [state?.success, router]);

	const productNameErrors = state?.errors?.productName;
	const brandErrors = state?.errors?.brand;
	const modelErrors = state?.errors?.model;
	const categoryErrors = state?.errors?.category;
	const genreErrors = state?.errors?.genre;
	const warrantyErrors = state?.errors?.warranty;
	const weightErrors = state?.errors?.weight;
	const priceErrors = state?.errors?.originalPrice;
	const discountErrors = state?.errors?.discount;
	const quantityErrors = state?.errors?.quantity;
	const descriptionErrors = state?.errors?.description;
	const imageErrors = state?.errors?.image;
	const formErrors = state?.errors?._form;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded cursor-pointer size-sm">
					Editar
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
				<form action={formAction}>
					<DialogHeader>
						<DialogTitle className="text-2xl">Editar Produto</DialogTitle>
						<DialogDescription>Edite os dados do produto.</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 py-4">
						<input type="hidden" name="productId" value={product.productName} />

						<div className="space-y-4">
							<h3 className="text-lg font-medium">Informações Básicas</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="productName">Nome do Produto</Label>
									<Input
										id="productName"
										name="productName"
										required
										defaultValue={product?.productName || ''}
										aria-describedby="productName-error"
										className={cn(productNameErrors && 'border-red-500')}
									/>
									<div id="productName-error" aria-live="polite" aria-atomic="true">
										{productNameErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="brand">Marca</Label>
									<Input
										id="brand"
										name="brand"
										required
										defaultValue={product?.brand || ''}
										aria-describedby="brand-error"
										className={cn(brandErrors && 'border-red-500')}
									/>
									<div id="brand-error" aria-live="polite" aria-atomic="true">
										{brandErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="model">Modelo</Label>
									<Input
										id="model"
										name="model"
										required
										defaultValue={product?.model || ''}
										aria-describedby="model-error"
										className={cn(modelErrors && 'border-red-500')}
									/>
									<div id="model-error" aria-live="polite" aria-atomic="true">
										{modelErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="warranty">Garantia (dias)</Label>
									<Input
										id="warranty"
										name="warranty"
										required
										defaultValue={product?.warranty || ''}
										aria-describedby="warranty-error"
										className={cn(warrantyErrors && 'border-red-500')}
									/>
									<div id="warranty-error" aria-live="polite" aria-atomic="true">
										{warrantyErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="genre">Gênero</Label>
									<Select
										name="genre"
										required
										value={selectedGenre}
										onValueChange={(value) => {
											setSelectedGenre(value);
											setSelectedCategory(''); 
										}}
									>
										<SelectTrigger
											id="genre"
											aria-describedby="genre-error"
											className={cn(genreErrors && 'border-red-500')}
										>
											<SelectValue placeholder="Selecione um gênero" />
										</SelectTrigger>
										<SelectContent>
											{genreCategories.map((genre) => (
												<SelectItem key={genre.value} value={genre.value}>
													{genre.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<div id="genre-error" aria-live="polite" aria-atomic="true">
										{genreErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="category">Categoria</Label>
									<Select
										name="category"
										required
										value={selectedCategory}
										onValueChange={setSelectedCategory}
										disabled={!selectedGenre || availableCategories.length === 0}
									>
										<SelectTrigger
											id="category"
											aria-describedby="category-error"
											className={cn(categoryErrors && 'border-red-500')}
										>
											<SelectValue
												placeholder={
													!selectedGenre
														? 'Selecione um gênero primeiro'
														: 'Selecione uma categoria'
												}
											/>
										</SelectTrigger>
										<SelectContent>
											{availableCategories.map((category) => (
												<SelectItem key={category.value} value={category.value}>
													{category.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<div id="category-error" aria-live="polite" aria-atomic="true">
										{categoryErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>
							</div>
						</div>

						<Separator />

						{/* Preços e Estoque */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Preços e Estoque</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="originalPrice">Preço Original (R$)</Label>
									<Input
										id="originalPrice"
										type="number"
										name="originalPrice"
										required
										min={0}
										step="0.01"
										defaultValue={product?.originalPrice || ''}
										onChange={(e) =>
											setOriginalPrice(parseFloat(e.target.value) || 0)
										}
										aria-describedby="price-error"
										className={cn(priceErrors && 'border-red-500')}
									/>
									<div id="price-error" aria-live="polite" aria-atomic="true">
										{priceErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="discount">Desconto (%)</Label>
									<Input
										id="discount"
										type="number"
										name="discount"
										required
										min={0}
										max={100}
										step="0.01"
										defaultValue={product?.discount || ''}
										onChange={(e) =>
											setDiscount(parseFloat(e.target.value) || 0)
										}
										aria-describedby="discount-error"
										className={cn(discountErrors && 'border-red-500')}
									/>
									<div id="discount-error" aria-live="polite" aria-atomic="true">
										{discountErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="discountedPrice">Preço Final</Label>
									<Input
										id="discountedPrice"
										type="text"
										name="discountedPrice"
										readOnly
										value={
											finalPrice > 0 ? `R$ ${finalPrice.toFixed(2)}` : 'R$ 0,00'
										}
										className="bg-muted cursor-not-allowed"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="quantity">Quantidade em Estoque</Label>
									<Input
										id="quantity"
										type="number"
										name="quantity"
										required
										min={0}
										defaultValue={product?.quantity || ''}
										aria-describedby="quantity-error"
										className={cn(quantityErrors && 'border-red-500')}
									/>
									<div id="quantity-error" aria-live="polite" aria-atomic="true">
										{quantityErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="weight">Peso</Label>
									<Input
										id="weight"
										type="number"
										name="weight"
										required
										min={0.1}
										defaultValue={product?.weight || ''}
										aria-describedby="weight-error"
										className={cn(weightErrors && 'border-red-500')}
									/>
									<div id="weight-error" aria-live="polite" aria-atomic="true">
										{weightErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>
							</div>
						</div>

						<Separator />

						{/* Detalhes do Produto */}
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Detalhes do Produto</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="description">Descrição</Label>
									<Textarea
										id="description"
										name="description"
										required
										rows={4}
										defaultValue={product?.description || ''}
										aria-describedby="description-error"
										className={cn(descriptionErrors && 'border-red-500')}
									/>
									<div id="description-error" aria-live="polite" aria-atomic="true">
										{descriptionErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="image">Imagem do Produto</Label>
									<Input
										id="image"
										type="file"
										name="image"
										accept="image/*"
										aria-describedby="image-error"
										className={cn(imageErrors && 'border-red-500')}
									/>
									<div id="image-error" aria-live="polite" aria-atomic="true">
										{imageErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>
							</div>
						</div>

						<div id="form-error" aria-live="polite" aria-atomic="true">
							{formErrors?.map((error: string) => (
								<p className="text-sm text-red-500" key={error}>
									{error}
								</p>
							))}
						</div>
					</div>

					<DialogFooter>
						<Button
							type="submit"
							className="cursor-pointer"
							disabled={isPending}
						>
							{isPending ? 'Salvando...' : 'Salvar Alterações'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}