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
  export class PaginationBiexeModel {
    page!: number;
    limit!: number;
    itemCount!: number;
    pageCount!: number;
    hasPreviousPage!: number;
    hasNextPage!: number;
  }