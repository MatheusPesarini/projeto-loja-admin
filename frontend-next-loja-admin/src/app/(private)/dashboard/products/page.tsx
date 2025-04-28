import { SiteHeader } from '@/components/dashboard-components/siteHeader';
import CreateProductButton from '@/components/products-components/createProductButton';
import SideBar from '@/components/side-bar-components/sideBar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function Dashboard() {
	return (
		<SidebarProvider>
			<SideBar variant="inset" />
			<SidebarInset>
				<SiteHeader title="Produtos" />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<CreateProductButton />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
