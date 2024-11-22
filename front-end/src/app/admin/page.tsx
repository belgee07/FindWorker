import { ChartComponentCategoryOrder } from "@/components/AdminChartCategory";
import { ChartComponentSubs } from "@/components/AdminChartSubs";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="admin-category">
                    Дашбоард
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard here</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col flex-1 gap-8 p-4">
          <div className="flex flex-1 gap-6">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <ChartComponentSubs />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <ChartComponentCategoryOrder />
            </div>
          </div>
          <div className="flex flex-1 grid auto-rows-min gap-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <ChartComponentSubs />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <ChartComponentSubs />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
