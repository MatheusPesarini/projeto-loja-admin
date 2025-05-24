'use client';

import { type LucideIcon } from 'lucide-react';

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';

type NavItem = {
	name: string;
	url: string;
	icon: LucideIcon;
};

export function NavMain({
	mainItems,
	productItems,
}: {
	mainItems: NavItem[];
	productItems: NavItem[];
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Dados</SidebarGroupLabel>
			<SidebarMenu>
				{mainItems.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<Link href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
						{/* <DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction
									showOnHover
									className="rounded-sm data-[state=open]:bg-accent"
								>
									<MoreHorizontalIcon />
									<span className="sr-only">Mais</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-24 rounded-lg"
								side={isMobile ? 'bottom' : 'right'}
								align={isMobile ? 'end' : 'start'}
							>
								<DropdownMenuItem>
									<FolderIcon />
									<span>Abrir</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<ShareIcon />
									<span>Compartilhar</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu> */}
					</SidebarMenuItem>
				))}
				<SidebarGroupLabel>Produtos</SidebarGroupLabel>
				{productItems.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton asChild>
							<Link href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
				{/* <SidebarMenuItem>
					<SidebarMenuButton className="text-sidebar-foreground/70">
						<span>Produtos</span>
					</SidebarMenuButton>
				</SidebarMenuItem> */}
			</SidebarMenu>
		</SidebarGroup>
	);
}
