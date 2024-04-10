export interface ExchangeModel {
  data: Object[];
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
