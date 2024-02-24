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
      { title: "Golongan", path: "/super-admin/data/positionCategory" },
    ],
  },
  {
    title: "Invoice",
    path: "/super-admin/invoice",
    icon: <Icon icon="lucide:notebook-text" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Data Invoice", path: "/super-admin/invoice/invoice-data" },
    ],
  },
  {
    title: "Simpanan",
    path: "/super-admin/saving",
    icon: <Icon icon="lucide:file-box" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Simpanan Pokok", path: "/super-admin/saving/pokok" },
      { title: "Simpanan Wajib", path: "/super-admin/saving/wajib" },
      {
        title: "Simpanan Wajib Khusus",
        path: "/super-admin/saving/wajib-khusus",
      },
      { title: "Simpanan Sukarela", path: "/super-admin/saving/sukarela" },
      {
        title: "Tabungan Rekreasi",
        path: "/super-admin/saving/tabungan-rekreasi",
      },
    ],
  },
  {
    title: "Piutang",
    path: "/super-admin/receivable",
    icon: <Icon icon="lucide:file-box" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Piutang S/P", path: "/super-admin/receivable/piutang-sp" },
      { title: "Piutang Dagang", path: "/super-admin/saving/piutang-dagang" },
    ],
  },
];
