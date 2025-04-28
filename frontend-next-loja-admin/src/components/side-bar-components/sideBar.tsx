'use client';

import {
	ArrowUpCircleIcon,
	HelpCircleIcon,
	LayoutDashboard,
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

import LogoutButton from './logout-button';
import { ThemeToggle } from './theme-switch-button';
import { NavSecondary } from './nav-secondary';
import { NavMain } from './nav-main';
import Link from 'next/link';

const data = {
	navMain: [
		{
			name: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboard,
		},
		{
			name: 'Produtos',
			url: '/dashboard/products',
			icon: PackageSearch,
		},
	],
	navSecondary: [
		// {
		//   title: "Settings",
		//   url: "#",
		//   icon: SettingsIcon,
		// },
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
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link href="#">
								<ArrowUpCircleIcon className="h-5 w-5" />
								<span className="text-base font-semibold">Nome Empresa</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
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
