import { SiteHeader } from '@/components/dashboard-components/siteHeader';
import CreateProductButton from '@/components/products-components/createProductButton';
import GridProduct from '@/components/products-components/gridProduct';
import SideBar from '@/components/side-bar-components/sideBar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Product } from '@/lib/actions/definitions';
import { getProduct } from '@/lib/actions/product/get-product';

export default async function Dashboard() {
	let products: Product[] = [];
	let error = null;
	try {
		const result = await getProduct();
		products = result?.products || [];
	} catch (error) {
		error = 'Erro ao obter produtos.';
		console.error('Erro ao obter produtos:', error);
	}

	return (
		<SidebarProvider>
			<SideBar variant="inset" />
			<SidebarInset>
				<SiteHeader title="Produtos" />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:p-6">
							{error ? (
								<p className='text-red-500'>{error}</p>
							) : (
								<GridProduct products={products} />
							)}
							<CreateProductButton />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
