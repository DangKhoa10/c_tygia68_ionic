export interface QueryModel {
    limit?: number;
    page?: number;
    search?: string;
    sort?: Record<string, 'DESC' | 'ASC'>;
    _?: number | null;
  }
  