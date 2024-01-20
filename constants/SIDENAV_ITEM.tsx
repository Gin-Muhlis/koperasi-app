import { SideNavItem } from '@/types/interface';
import { Icon, IconProps } from '@iconify/react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon:<Icon icon="lucide:home" width="22" height="22" />,
  },
  {
    title: 'Data',
    path: '/data',
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Member', path: '/data/member' },
      { title: 'Kategori', path: '/data/category' },
      { title: 'Sub-kategori', path: '/data/subKategori' },
      { title: 'Produk', path: '/data/product' },
      { title: 'Barang', path: '/data/stuff' },
    ],
  },
];
