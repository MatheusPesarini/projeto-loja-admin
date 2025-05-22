'use client';

import {
	FolderIcon,
	MoreHorizontalIcon,
	ShareIcon,
	type LucideIcon,
} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';

type NavItem = {
	name: string;
	url: string;
	icon: LucideIcon;
}

export function NavMain({
	mainItems,
	productItems
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
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
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
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
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
