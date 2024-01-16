import { Icon, IconProps } from '@iconify/react';
import { SideNavItem } from "@/types/typeLayout";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon:<Icon icon="lucide:home" width="22" height="22" />,
  },
  {
    title: "About",
    path: "/about",
    icon:<Icon icon="lucide:home" width="22" height="22" />,
  },
];
