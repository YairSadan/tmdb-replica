import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Flame, Heart, Theater } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
const items = [
  {
    title: "Popular",
    href: "/movie",
    icon: Flame,
  },
  {
    title: "Now Playing",
    href: "/movie/?airingNow=true",
    icon: Theater,
  },
  {
    title: "Favorites",
    href: "/movie/favorites",
    icon: Heart,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className=" flex-row justify-between">
        <h1 className="text-2xl font-bold">Movies</h1>
        <ModeToggle />
      </SidebarHeader>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
