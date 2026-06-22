import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import logo from "@/assets/icons/lgo.png";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { House } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  // This is sample data.
  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {" "}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <div>
            <h1 className="text-base font-semibold tracking-tight">
              Wallet
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold tracking-tight">
                IQ
              </span>{" "}
            </h1>
            <p className="text-xs text-muted-foreground -mt-0.5">
              Modern Experience
            </p>
          </div>
        </div>
      </SidebarHeader>
      {/* <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      // isActive={item.isActive}
                      render={<Link to={item.url} />}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      
      </SidebarContent> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link to="/" />}>
                  <House className="size-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<Link to={item.url} />}>
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
