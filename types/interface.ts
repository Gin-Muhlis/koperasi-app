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
  imageProfile: File | string | null;
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
  gender: "L" | "P";
  identify_number: number;
  religion: string;
  position: "pns" | "p3k" | "cpns";
  imageProfile: File | string | Blob | undefined;
  payment_member: number;
  date_activation: number;
  role: "member" | "super-admin";
  username: string;
  password: string;
  active: number;
  last_login_ip: string;
  last_login_time: string;
};

export type RoleState = {
  id: number;
  name: string;
};

export type CategoryState = {
  id: number;
  uuid: string;
  name: string;
};

export type SubCategoryState = {
  id: number;
  uuid: string;
  code: number;
  name: string;
  type: "debit" | "kredit";
  category: string;
  category_id: string;
};

export type ProductState = {
  id: number;
  uuid: string;
  name: string;
};

export type StuffState = {
  id: number;
  uuid: string;
  name: string;
  price: number;
  image: File | string | Blob | undefined;
  product_id: number;
  product_name: string;
};

export type PaymentDeterminationState = {
  id: number;
  uuid: string;
  name: string;
  sub_category: string;
  amount: number;
  payment_month: string;
};

export type TypeTab = {
  id: number;
  member_name: string;
  member_position: string;
};

export type PositionCategory = {
  id: number;
  position: string;
  pokok: number;
  wajib: number;
  wajib_khusus: number;
};

export type Member = {
  id: number;
  amount: number;
  status: string;
  loanId: number | null
};

export type Receivable = {
  id: number;
  name: string;
  position: string;
  loan_id: number;
  total_payment: number;
  monthly: number;
  paid: number;
  remain_payment: number;
};

export type TotalColumn = {
  totalPokok: number;
  totalWajib: number;
  totalWajibKhusus: number;
  totalSukarela: number;
  totalTabunganRekreasi: number;
  totalPiutangSp: number;
  totalPiutangDagang: number;
};


export type MandatorySaving = {
  id: number;
  name: string;
  position: string;
  month_remain: number
}

export type Invoice = {
  memberId: number;
  principalSaving: number;
  mandatorySaving: number;
  specialMandatorySaving: number;
  voluntarySaving: number;
  recretionalSaving: number;
  receivable: number;
  accountReceivable: number;
}

export type InvoiceState = {
  id: number,
  uuid: string;
  name: string;
  principal_saving: number;
  mandatory_saving: number;
  special_mandatory_saving: number;
  voluntary_saving: number;
  recretional_saving: number;
  receivable: number;
  account_receivable: number;
  month_year: string;
}