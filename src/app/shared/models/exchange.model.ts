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

export interface QueryExchangeModel {
  page?: number;
  limit?: number;
  sort?: string;
  client_id?: number;
  type?: string;
}
