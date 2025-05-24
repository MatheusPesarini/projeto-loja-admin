'use client';

import { SiteHeader } from '@/components/dashboard-components/siteHeader';
import SideBar from '@/components/side-bar-components/sideBar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import CreateProductForm from '@/components/products-components/createProductForm';

export default function Dashboard() {
	return (
		<SidebarProvider>
			<SideBar variant="inset" />
			<SidebarInset>
				<SiteHeader title="Criar Produtos" />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<CreateProductForm />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
