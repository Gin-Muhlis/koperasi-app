import { SideNavItem } from '@/types/interface';
import { Icon, IconProps } from '@iconify/react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/super-admin/dashboard",
    icon:<Icon icon="lucide:home" width="22" height="22" />,
  },
  {
    title: 'Data',
    path: '/super-admin/data',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Member', path: '/super-admin/data/member' },
      { title: 'Kategori', path: '/super-admin/data/category' },
      { title: 'Sub-kategori', path: '/super-admin/data/subKategori' },
      { title: 'Produk', path: '/super-admin/data/product' },
      { title: 'Barang', path: '/super-admin/data/stuff' },
    ],
  },
];
