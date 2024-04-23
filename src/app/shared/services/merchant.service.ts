import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { PostModel, QueryPost } from '../models/ads.model';
import { PaginationBiexceModel } from '../models/exchange-biexce.model';
import { ApiBiexceService } from './api-biexce.service';
@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  public apiRoute = ApiUrl.Biexce.Merchant;
  apiBiexceService: ApiBiexceService = inject(ApiBiexceService);
  ListMerchant(query: QueryPost) {
    return this.apiBiexceService.get<{
        data:PostModel[],
        meta:PaginationBiexceModel
    }>(
      this.apiRoute.List(),
      query
    );
  }

  getDetail(id: number) {
    return this.apiBiexceService.get<{
      detail:PostModel
    }>(this.apiRoute.MerchantDetail(id));
  }
}
