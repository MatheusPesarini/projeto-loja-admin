'use client';

import {
	ArrowUpCircleIcon,
	HelpCircleIcon,
	LayoutDashboard,
	PackagePlus,
	PackageSearch,
} from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar';

import LogoutButton from './logoutButton';
import { ThemeToggle } from './themeSwitchButton';
import { NavSecondary } from './navSecondary';
import { NavMain } from './navMain';

const data = {
	navMain: [
		{
			name: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboard,
		},
	],
	products: [
		{
			name: 'Produtos',
			url: '/dashboard/products',
			icon: PackageSearch,
		},
		{
			name: 'Criar Produto',
			url: '/dashboard/products/create',
			icon: PackagePlus,
		},
	],
	navSecondary: [
		{
			title: 'Get Help',
			url: '/dashboard/help',
			icon: HelpCircleIcon,
		},
	],
};

export default function SideBar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<span className="text-base font-semibold">Admin</span>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain mainItems={data.navMain} productItems={data.products} />
				{/* <NavDocuments items={data.documents} /> */}
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				{/* <NavUser user={data.user} /> */}
				<LogoutButton />
				<ThemeToggle />
			</SidebarFooter>
		</Sidebar>
	);
}
