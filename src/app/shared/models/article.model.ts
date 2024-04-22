

export interface ArticleModel {
  code: string;
  created_at: string;
  description: string;
  id: number;
  image: string;
  link: string;
  title: string;
}
export interface QueryArticle{
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  code?: string;
}
