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

export default function CreateProductButton() {
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
				<DialogHeader>
					<DialogTitle>Adicionar Produto</DialogTitle>
					<DialogDescription>
						Insira os dados abaixo para adicionar o produto.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Nome
						</Label>
						<Input id="name" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="category" className="text-right">
							Categoria
						</Label>
						<Input id="category" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="price" className="text-right">
							Preço
						</Label>
						<Input id="price" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="discount" className="text-right">
							Desconto
						</Label>
						<Input id="discount" className="col-span-3" defaultValue={0}/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="quantity" className="text-right">
							Quantidade
						</Label>
						<Input id="quantity" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Descrição
						</Label>
						<Input id="description" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="image" className="text-right">
							Imagem
						</Label>
						<Input id="image" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" className="cursor-pointer">
						Adicionar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
