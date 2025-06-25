'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { submitProduct } from '@/lib/actions/product/post-product';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
	genreCategories,
	initialState,
	productCategoriesByGenre,
} from './utils/product-definition';

export default function CreateProductForm() {
	const [originalPrice, setOriginalPrice] = useState<number>(0);
	const [discount, setDiscount] = useState<number>(0);
	const [finalPrice, setFinalPrice] = useState<number>(0);

	const [state, formAction, isPending] = useActionState(
		submitProduct,
		initialState,
	);

	const [selectedGenre, setSelectedGenre] = useState<string>('');
	const [availableCategories, setAvailableCategories] = useState<
		Array<{ value: string; label: string }>
	>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('');

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
			setAvailableCategories([]); // Limpa as categorias se nenhum gênero for selecionado
		}
		setSelectedCategory(''); // Reseta a categoria selecionada ao mudar o gênero
	}, [selectedGenre]);

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
		<div className="container mx-auto py-6 px-4 max-w-4xl">
			<Card>
				<form action={formAction}>
					<CardHeader>
						<CardTitle className="text-2xl">Adicionar Produto</CardTitle>
					</CardHeader>

					<CardContent className="space-y-6">
						<div className="space-y-4">
							<h3 className="text-lg font-medium">Informações Básicas</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								<div className="space-y-2">
									<Label htmlFor="productName">Nome do Produto</Label>
									<Input
										id="productName"
										name="productName"
										placeholder="Digite o nome do produto"
										required
										aria-describedby="productName-error"
										className={cn(productNameErrors && 'border-red-500')}
									/>
									<div
										id="productName-error"
										aria-live="polite"
										aria-atomic="true"
									>
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
										placeholder="Digite a marca"
										required
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
										placeholder="Digite o modelo"
										required
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
									<Label htmlFor="genre">Gênero</Label>
									<Select
										name="genre"
										required
										value={selectedGenre}
										onValueChange={(value) => {
											setSelectedGenre(value);
										}}
									>
										<SelectTrigger
											id="genre"
											aria-describedby="genre-error"
											className={cn(
												categoryErrors && 'border-red-500',
												'w-full',
											)}
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

								<div className="space-y-2 ">
									<Label htmlFor="category">Categoria</Label>
									<Select
										name="category"
										required
										value={selectedCategory}
										onValueChange={setSelectedCategory}
										disabled={
											!selectedGenre || availableCategories.length === 0
										}
									>
										<SelectTrigger
											id="category"
											aria-describedby="category-error"
											className={cn(
												'w-full',
												categoryErrors && 'border-red-500',
											)}
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
									<div
										id="category-error"
										aria-live="polite"
										aria-atomic="true"
									>
										{categoryErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="warranty">Garantia</Label>
									<Input
										id="warranty"
										name="warranty"
										placeholder="Digite a garantia em dias"
										required
										aria-describedby="warranty-error"
										className={cn(modelErrors && 'border-red-500')}
									/>
									<div
										id="warranty-error"
										aria-live="polite"
										aria-atomic="true"
									>
										{warrantyErrors?.map((error: string) => (
											<p className="text-sm text-red-500" key={error}>
												{error}
											</p>
										))}
									</div>
								</div>
							</div>
						</div>

						<Separator />

						<div className="space-y-4">
							<h3 className="text-lg font-medium">Preços e Estoque</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="originalPrice">Preço Original (R$)</Label>
									<Input
										id="originalPrice"
										type="number"
										name="originalPrice"
										placeholder="0,00"
										required
										min={0}
										step="0.01"
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
										placeholder="0"
										required
										min={0}
										max={100}
										step="0.01"
										onChange={(e) =>
											setDiscount(parseFloat(e.target.value) || 0)
										}
										aria-describedby="discount-error"
										className={cn(discountErrors && 'border-red-500')}
									/>
									<div
										id="discount-error"
										aria-live="polite"
										aria-atomic="true"
									>
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
										placeholder="0"
										required
										min={0}
										aria-describedby="quantity-error"
										className={cn(quantityErrors && 'border-red-500')}
									/>
									<div
										id="quantity-error"
										aria-live="polite"
										aria-atomic="true"
									>
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
										placeholder="0"
										required
										min={0.1}
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

						<div className="space-y-4">
							<h3 className="text-lg font-medium">Detalhes do Produto</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2 md:col-span-2">
									<Label htmlFor="description">Descrição</Label>
									<Textarea
										id="description"
										name="description"
										placeholder="Descreva o produto..."
										required
										rows={4}
										aria-describedby="description-error"
										className={cn(descriptionErrors && 'border-red-500')}
									/>
									<div
										id="description-error"
										aria-live="polite"
										aria-atomic="true"
									>
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
										required
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
					</CardContent>

					<CardFooter className="flex gap-4">
						<Button
							type="submit"
							disabled={isPending}
							className="cursor-pointer"
						>
							{isPending ? 'Salvando...' : 'Criar Produto'}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
