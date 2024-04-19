export interface ExchangeModel {
  data: ExchangeFieldModel[];
  pagination: PaginationModel;
}

export interface PaginationModel {
  currentPage: number;
  from: number;
  lastPage: number;
  nextPage: number;
  perPage: number;
  prevPage: number;
  to: number;
  total: number;
}

export interface ExchangeFieldModel {
  from: string;
  to: string;
  buy: number;
  sell: number;
  volatility_buy: number;
  volatility_sell: number;
  bank: any;
  change: any;
  meta: any;
}

export interface ExchangeGoldModel {
  buyChange: number;
  buyChangePercent: string;
  buyingPrice: number;
  code: string;
  dateTime: string;
  name: string;
  sellChange: number;
  sellChangePercent: number;
  sellingPrice: number;

  buy: number;
  date: string;
  prev_buy: number;
  prev_sell: number;
  sell: number;
  time: string;
  type: string;
}

export interface ExchangeGoldAreaModel {
  area: string;
  buy_price: string;
  note: string;
  sell_price: string;
  type: string;
}
export interface BankModel {
  bank: string;
  code_bank: string;
}

export interface ExchangeBankModel {
  buy_CK: string;
  buy_TM: string;
  exchange_name: string;
  sell_CK: string;
  sell_TM: string;
}
export interface QueryExchangeModel {
  page?: number;
  limit?: number;
  sort?: string;
  client_id?: number;
  type?: string;
  to?: string;
  search?: string;
  source_id?: number;
  bank_code?: string;
  market?: string;
  country?: string;
  targetCurrency?: string;
  area?: string;
  rate?: number;
  price?: number;
  from?: string;
}

export interface NiceGoldModel {
  SJC_World: number;
  Bdep_World: number;
}
