import { Plus } from 'lucide-react';
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
import { useActionState } from 'react';
import submitProduct from '@/lib/actions/product/post-product';
import { cn } from '@/lib/utils';

const initialState = {
	success: false,
	message: '',
	errors: {},
};

export default function CreateProductButton() {
	const [state, formAction, isPending] = useActionState(
		submitProduct,
		initialState,
	);

	const productNameErrors = state?.errors?.productName;
	const priceErrors = state?.errors?.price;
	const descriptionErrors = state?.errors?.description;
	const categoryErrors = state?.errors?.category;
	const quantityErrors = state?.errors?.quantity;
	const imageErrors = state?.errors?.image;
	const discountErrors = state?.errors?.discount;
	const formErrors = state?.errors?._form;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className="absolute right-10 bottom-10 btn btn-primary w-20 h-20 rounded-full cursor-pointer"
					size={'icon'}
					variant="default"
					asChild
				>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form action={formAction}>
					<DialogHeader>
						<DialogTitle>Adicionar Produto</DialogTitle>
						<DialogDescription>
							Insira os dados abaixo para adicionar o produto.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="productName" className="text-right">
								Nome do Produto
							</Label>
							<Input
								id="productName"
								type="text"
								name="productName"
								required
								aria-describedby='productName-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									productNameErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='productName-error' aria-live='polite' aria-atomic='true'>
								{productNameErrors && productNameErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="category" className="text-right">
								Categoria
							</Label>
							<Input
								id="category"
								type="text"
								name="category"
								required
								aria-describedby='category-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									productNameErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='category-error' aria-live='polite' aria-atomic='true'>
								{categoryErrors && categoryErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="price" className="text-right">
								Preço
							</Label>
							<Input
								id="price"
								type="text"
								name="price"
								required
								aria-describedby='price-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									priceErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='price-error' aria-live='polite' aria-atomic='true'>
								{priceErrors && priceErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="discount" className="text-right">
								Desconto
							</Label>
							<Input
								id="discount"
								type="text"
								name="discount"
								required
								aria-describedby='discount-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									discountErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='discount-error' aria-live='polite' aria-atomic='true'>
								{discountErrors && discountErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="quantity" className="text-right">
								Quantidade
							</Label>
							<Input
								id="quantity"
								type="text"
								name="quantity"
								required
								aria-describedby='quantity-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									quantityErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='quantity-error' aria-live='polite' aria-atomic='true'>
								{quantityErrors && quantityErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Descrição
							</Label>
							<Input
								id="description"
								type="text"
								name="description"
								required
								aria-describedby='description-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									descriptionErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='description-error' aria-live='polite' aria-atomic='true'>
								{descriptionErrors && descriptionErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="image" className="text-right">
								Imagem
							</Label>
							<Input
								id="image"
								type="file"
								name="image"
								required
								aria-describedby='image-error'
								className={cn(
									'text-black bg-amber-50 w-full p-2 col-span-3 rounded border',
									productNameErrors ? 'border-red-500' : 'border-gray-300',
								)}
							/>
							<div id='image-error' aria-live='polite' aria-atomic='true'>
								{imageErrors && imageErrors.map((error: string) => (
									<p className='mt-1 text-sm text-red-500' key={error}>
										{error}
									</p>
								))}
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" className="cursor-pointer">
							Adicionar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
