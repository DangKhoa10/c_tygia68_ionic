export interface ChargedModel {
  amount?: string;
  interest?: string;
  money?: string;
  month?: number;
  total?: string;
}
export interface TotalCharged {
  totalInterest?: number;
  totalMoney?: number;
}
export interface QueryChargedModel {
  page?: number;
  limit?: number;
  sort?: string;
  client_id?: number;
  amount?: number;
  interest?: number;
  interest_type_id?: number;
  price_unit_id?: number;
  time?: number;
  time_unit_id?: number;
}
