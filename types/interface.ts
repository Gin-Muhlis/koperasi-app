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
  group_id: string;
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
  type_payment: string;
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
  "simpanan pokok": number;
  "simpanan wajib": number;
  "simpanan wajib khusus": number;
};

export type Member = {
  id: number;
  amount: number;
  status: string;
  sub_category: number;
  loanId?: number;
};

export type Status = {
  month_year: string;
  status: string;
};

export type Receivable = {
  id: number;
  name: string;
  position: string;
  loan_id: number;
  sub_category_id?: number;
  total_payment: number;
  monthly: number;
  paid: number;
  remain_payment: number;
  month_status?: Status[];
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
  details: any[];
};

export type SubCategoryInvoice = {
  id: number;
  name: string;
  position: string;
  payment: number;
  month_status?: Status[];
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
  code: number;
};

export type DashboardMember = {
  total_mandatory_saving: number;
  total_special_mandatory_saving: number;
  total_voluntary_saving: number;
  total_recretional_saving: number;
  history_savings: History[];
  history_installments: History[];
};

export type HistoryInvoice = {
  invoice_name: number;
  date: string;
  status: string;
  payment_source: string;
  payment_method: string;
};

export type DashboardAdmin = {
  count_member: number;
  count_invoices_not_paid: number;
  count_invoices_paid: number;
  total_savings: number;
  total_loans: number;
  history_invoices: HistoryInvoice[];
};

export type MemberReceivable = {
  id: number;
  name: string;
  amount: number;
  date: string;
  duration: number;
  deadline: string;
  total: number;
};

export type ReceivableData = {
  member_id: number;
  amount: number;
  sub_category_id: number;
  duration: number;
  date: string;
  total: number;
  deadline: string;
  description: string;
};

export type ReportMember = {
  id: number;
  name: string;
  principal_saving: number;
  mandatory_saving: number;
  special_mandatory_saving: number;
  voluntary_saving: number;
  recretional_saving: number;
  receivable: number;
  account_receivable: number;
};

export type DataNasabah = {
  principal_saving: number;
  mandatory_saving: number;
  special_mandatory_saving: number;
  voluntary_saving: number;
  recretional_saving: number;
  receivable: number;
};

export type ReportLoanmember = {
  id: number;
  name: string;
  position: string;
  total_payment: number;
  monthly: number;
  paid: number;
  remain_payment: number;
};

export type MemberInstallment = {
  id: number;
  name: string;
  amount: number;
  remain_payment: number;
};

export type ProfileApp = {
  id: number;
  app_name: string;
  chairmans_name: string;
  treasurer_name: string;
  icon: string;
  address: string;
  phone_number: number;
  about: string;
};

export type DetailSaving = {
  [key: string]: number;
};

export type HistorySaving = {
  id: number;
  amount: number;
  sub_category: string;
  date: string;
  status: string;
};

export type ListSaving = {
  id: number;
  name: string;
  position: string;
  total_saving: number;
  detail_savings: DetailSaving;
  history_savings: HistorySaving[];
};

export type DetailLoan = {
  code: number;
  total_loan: number;
  paid: number;
  remain_payment: number;
  deadline: string;
  date_completion: string |  null;
  status: string;
  sub_category: string;
  duration: string;
};

export type ListLoan = {
  id: number;
  name: string;
  position: string;
  total_loan: number;
  loan_progress: boolean;
  detail_loans: DetailLoan[];
};
