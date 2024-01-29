import { SideNavItem } from "@/types/interface";
import { Icon, IconProps } from "@iconify/react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <Icon icon="lucide:home" width="22" height="22" />,
  },
  {
    title: "Data",
    path: "/super-admin/data",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Member", path: "/super-admin/data/member" },
      { title: "Kategori", path: "/super-admin/data/category" },
      { title: "Sub-kategori", path: "/super-admin/data/subCategory" },
      { title: "Produk", path: "/super-admin/data/product" },
      { title: "Barang", path: "/super-admin/data/stuff" },
    ],
  },
  // {
  //   title: "Transaksi",
  //   path: "/super-admin/transaction",
  //   icon: <Icon icon="lucide:shopping-cart" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Pembelian", path: "/super-admin/transaction/purchase" },
  //     { title: "Penjualan", path: "/super-admin/transaction/sale" },
  //   ],
  // },
  {
    title: "Simpanan",
    path: "/super-admin/saving",
    icon: <Icon icon="lucide:file-box" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Simpanan Wajib", path: "/super-admin/saving/wajib" },
      { title: "Simpanan Pokok", path: "/super-admin/saving/pokok" },
      { title: "Simpanan Sukarela", path: "/super-admin/saving/sukarela" },
    ],
  },
  // {
  //   title: "App",
  //   path: "/super-admin/app",
  //   icon: <Icon icon="lucide:file-box" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Simpanan", path: "/super-admin/app/saving" },
  //     { title: "Pinjaman", path: "/super-admin/app/sale" },
  //   ],
  // },
];
