import SideBar from "@/components/side-bar-components/sideBar"
// import { ChartAreaInteractive } from "@/components/dashboardComponents/chart-area-interactive"
// import { DataTable } from "@/components/dashboardComponents/data-table"
import { SectionCards } from "@/components/dashboard-components/sectionCards"
import { SiteHeader } from "@/components/dashboard-components/siteHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
	return (
		<SidebarProvider>
			<SideBar variant="inset" />
			<SidebarInset>
				<SiteHeader title="Início" />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<SectionCards />
							<div className="px-4 lg:px-6">
								{/* <ChartAreaInteractive /> */}
							</div>
							{/* <DataTable /> */}
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}