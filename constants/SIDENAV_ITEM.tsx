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
      { role: "super-admin", title: "Anggota", path: "/super-admin/data/member" },
      { role: "super-admin", title: "Sub Kategori", path: "/super-admin/data/subCategory" },
      { role: "super-admin", title: "Produk", path: "/super-admin/data/product" },
      { role: "super-admin", title: "Barang", path: "/super-admin/data/stuff" },
      { role: "super-admin", title: "Golongan", path: "/super-admin/data/positionCategory" },
      { role: "super-admin", title: "Profil App", path: "/super-admin/data/profileApp" },
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
    title: "Aplikasi",
    path: "/super-admin/applications",
    icon: <Icon icon="lucide:file-plus" width="24" height="24" />,
    submenu: true,
    role: "super-admin",
    subMenuItems: [
      { role: "super-admin", title: "Simpanan", path: "/super-admin/applications/saving" },
      { role: "super-admin", title: "Pinjaman", path: "/super-admin/applications/loan" },
      { role: "super-admin", title: "Angsuran", path: "/super-admin/applications/installment" },
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
