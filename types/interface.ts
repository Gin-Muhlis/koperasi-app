export type Auth = {
  name: string;
  role: string;
  imageProfile: string;
  accessToken: string;
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

export type InitialState = {
  value: RegisterState;
};

export type RegisterState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  religion: string;
  role: string;
  imageProfile: File | string |null;
  password: string;
  confirmPassword: string;
};

export type MemberState = {
  id: number;
  name: string;
  uuid: string;
  email: string;
  address: string;
  phone_number: string;
  gender: 'L' | 'P';
  identify_number: number;
  religion: string;
  position: 'pns' | 'p3k' | 'cpns';
  imageProfile: File | string | Blob | undefined;
  date_activation: number;
  role: 'member' | 'super-admin';
  username: string;
  password: string;
  active: number;
  last_login_ip: string;
  last_login_time: string;
};

export type RoleState = {
  id: number;
  name: string;
}

export type CategoryState = {
  id: number;
  uuid: string;
  name: string;
}