export interface PostModel {
  name: string;
  updatedAt: string;
  content: string;
  id: number;
  extra: ExtraModel;
  category?:CategoryModel
}
export interface QueryPost {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  key?: string;
  id?: string;
}
interface ExtraModel {
  thumbnail: string;
  subTitle: string;
}
interface CategoryModel {
  id?:number,
  name?:string,
  key?:string
}
