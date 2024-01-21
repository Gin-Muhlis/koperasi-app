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

export type Member = {
  name: string;
  uuid: string;
  email: string;
  phone_number: number;
  address: string;
  gender: string;
  religion: string;
  role: string;
  imageProfile: string;
  position: string;
}
