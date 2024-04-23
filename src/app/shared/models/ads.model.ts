

export interface AdsModel {
    name: string;
    updatedAt: string;
    content: string;
    id: number;
    extra: ExtraModel;

  }
  export interface QueryAds{
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    key?: string;
  }
  interface ExtraModel{
    thumbnail: string

}