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
  imageProfile: any;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: any;
};

export type MemberState = {
  id: number;
  name: string;
  uuid: string;
  email: string;
  address: string;
  phone_number: string;
  gender: string;
  identify_number: number;
  religion: string;
  position: string;
  imageProfile: any;
  date_activation: number;
  role: string;
  username: string;
  password: string;
  active: boolean;
  last_login_ip: string;
  last_login_time: string;
  isLoading: boolean;
  error: any;
  success: boolean;
};

export type RoleState = {
  id: number;
  name: string;
}