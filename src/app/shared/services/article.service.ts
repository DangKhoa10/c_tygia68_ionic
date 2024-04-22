import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { ApiService } from './api.service';
import { ArticleModel, QueryArticle} from '../models/article.model';
import { QueryModel } from '../models/query.model';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public apiRoute = ApiUrl.Article;
  apiService: ApiService = inject(ApiService);

  ListArticle(query: QueryModel) {
    return this.apiService.get<ArticleModel[]>(
      this.apiRoute.List(),
      query
    );
  }
  getArticle(query: QueryArticle) {
    return this.apiService.get<ArticleModel>(this.apiRoute.Detail(),query);
  }
}
