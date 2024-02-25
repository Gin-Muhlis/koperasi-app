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
  role: string;
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
  position_category: string;
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
  name: string;
  pokok: number;
  wajib: number;
  wajib_khusus: number;
};

export type Member = {
  id: number;
  amount: number;
  status: string;
  loanId?: number;
};

export type Status = {
  month: string;
    status: string
}

export type Receivable = {
  id: number;
  name: string;
  position: string;
  loan_id: number;
  total_payment: number;
  monthly: number;
  paid: number;
  remain_payment: number;
  month_status?: Status[]
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
  month_remain: number;
};

export type Invoice = {
  memberId: number;
  principalSaving: number;
  mandatorySaving: number;
  specialMandatorySaving: number;
  voluntarySaving: number;
  recretionalSaving: number;
  receivable: number;
  accountReceivable: number;
  memberName?: string;
};

export type InvoiceState = {
  id: number;
  invoice_code: string;
  invoice_name: string;
  payment_source: string;
  date: string;
  due_date: string;
  status: string;
  payment_method: string;
  payment_date: string;
  user: string;
  details: Invoice[];
};

export type SubCategoryInvoice = {
  id: number;
  name: string;
  position: string;
  payment: number;
  month_status?: Status[]
};

export type PaymentState = {
  id?: number;
  invoice_id?: number;
  invoice_code?: string;
  amount: number;
  date_payment?: string;
  no_rek: string | null;
  transfer_name: string | null;
  total_invoice?: number;
};

export type History = {
  date: string;
  amount: number;
  code: number
}

export type DashboardMember = {
  total_mandatory_saving: number,
  total_special_mandatory_saving: number,
  total_voluntary_saving: number,
  total_recretional_saving: number,
  history_savings: History[],
  history_installments: History[],
}