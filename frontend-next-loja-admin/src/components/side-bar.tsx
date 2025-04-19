'use client';

import Link from 'next/link';
import {
    ArrowUpCircleIcon,
    LayoutDashboard,
    PackageSearch,
} from "lucide-react";  

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';

import LogoutButton from './logout-button';
import Image from 'next/image';

const data = {
    dashboard: {
        icon: <LayoutDashboard />,
        label: 'Dashboard',
        href: '/dashboard',
    },
    products: {
        icon: <PackageSearch />,
        label: 'Produtos',
        href: '/dashboard/products',
    },
}

export default function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>, { isAuthenticated }: { isAuthenticated: boolean }) {
    if (!isAuthenticated) {
        return null;
    }

    return (
        <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <a href="#">
                  <ArrowUpCircleIcon className="h-5 w-5" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavDocuments items={data.documents} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
          <LogoutButton/>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    );
}