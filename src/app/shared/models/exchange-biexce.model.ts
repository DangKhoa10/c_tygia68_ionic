export class PaginationBiexceModel {
  page!: number;
  limit!: number;
  itemCount!: number;
  pageCount!: number;
  hasPreviousPage!: number;
  hasNextPage!: number;
}

export interface ExchangeBiexceModel {
  data: ExchangeBiexceFieldModel[];
  meta: PaginationBiexceModel;
}

export interface ExchangeBiexceFieldModel {
  name: string;
  baseCurrency: string;
  targetCurrency: string;
  priceBuy: number;
  priceSell: number;
  changePriceBuy: number;
  changePriceSell: number;
  closePriceBuy: number;
  closePriceSell: number;
  updatedAt: string;
  id: number;
  amptitudeBuy: number;
  amptitudeSell: number;
  type: string;
}
