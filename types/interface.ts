export type Auth = {
  name: string;
  email: string;
  role: string;
  token: string;
};

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}
