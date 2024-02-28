import { SideNavItem } from "@/types/interface";
import { Icon, IconProps } from "@iconify/react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  // admin menu
  {
    title: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <Icon icon="lucide:home" width="22" height="22" />,
    role: "super-admin",
  },
  {
    title: "Data",
    path: "/super-admin/data",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    role: "super-admin",
    subMenuItems: [
      { role: "super-admin", title: "Member", path: "/super-admin/data/member" },
      { role: "super-admin", title: "Kategori", path: "/super-admin/data/category" },
      { role: "super-admin", title: "Sub-kategori", path: "/super-admin/data/subCategory" },
      { role: "super-admin", title: "Produk", path: "/super-admin/data/product" },
      { role: "super-admin", title: "Barang", path: "/super-admin/data/stuff" },
      { role: "super-admin", title: "Golongan", path: "/super-admin/data/positionCategory" },
    ],
  },
  {
    title: "Invoice",
    path: "/super-admin/invoice",
    icon: <Icon icon="lucide:notebook-text" width="24" height="24" />,
    submenu: true,
    role: "super-admin",
    subMenuItems: [
      { role: "super-admin", title: "Data Invoice", path: "/super-admin/invoice/invoice-data" },
    ],
  },
  {
    title: "Simpanan",
    path: "/super-admin/saving",
    icon: <Icon icon="lucide:file-plus" width="24" height="24" />,
    submenu: true,
    role: "super-admin",
    subMenuItems: [
      { role: "super-admin", title: "Simpanan Pokok", path: "/super-admin/saving/pokok" },
      { role: "super-admin", title: "Simpanan Wajib", path: "/super-admin/saving/wajib" },
      {
        role: "super-admin", title: "Simpanan Wajib Khusus",
        path: "/super-admin/saving/wajib-khusus",
      },
      { role: "super-admin", title: "Simpanan Sukarela", path: "/super-admin/saving/sukarela" },
      {
        role: "super-admin",
        title: "Tabungan Rekreasi",
        path: "/super-admin/saving/tabungan-rekreasi",
      },
    ],
  },
  {
    title: "Piutang",
    path: "/super-admin/receivable",
    icon: <Icon icon="lucide:file-minus" width="24" height="24" />,
    submenu: true,
    role: "super-admin",
    subMenuItems: [
      { role: "super-admin", title: "Piutang S/P", path: "/super-admin/receivable/sp" },
      { role: "super-admin", title: "Piutang Dagang", path: "/super-admin/receivable/dagang" },
      { role: "super-admin", title: "Pembayaran Angsuran", path: "/super-admin/receivable/angsuran" },

    ],
  },
  {
    title: "laporan",
    path: "/super-admin/report",
    icon: <Icon icon="lucide:book-text" width="24" height="24" />,
    submenu: true,
    role: "super-admin",
    subMenuItems: [
      { role: "super-admin", title: "Anggota", path: "/super-admin/report/member" },
      { role: "super-admin", title: "Pinjaman", path: "/super-admin/report/receivable" },
    ],
  },
  // member menu
  {
    title: "Dashboard",
    path: "/member/dashboard",
    icon: <Icon icon="lucide:home" width="22" height="22" />,
    role: "member",
  },
  {
    title: "Profile",
    path: "/member/profile",
    icon: <Icon icon="lucide:circle-user-round" width="22" height="22" />,
    role: "member",
  },
  // nasabah menu
  {
    title: "Dashboard",
    path: "/nasabah/dashboard",
    icon: <Icon icon="lucide:home" width="22" height="22" />,
    role: "nasabah",
  },
];
