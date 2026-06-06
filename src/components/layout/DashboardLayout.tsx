import { AppSidebar } from "@/components/app-sidebar";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { data } = useUserInfoQuery(undefined);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Toaster />
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Dashboard
            </span>
          </div>
          {data?.data?.email && <NotificationDropdown />}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
        <ChatbotWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}
