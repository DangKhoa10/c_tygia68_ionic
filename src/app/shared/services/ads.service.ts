import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { AdsModel, QueryAds } from '../models/ads.model';
import { PaginationBiexceModel } from '../models/exchange-biexce.model';
import { ApiBiexceService } from './api-biexce.service';
@Injectable({
  providedIn: 'root',
})
export class AdsService {
  public apiRoute = ApiUrl.Biexce.Merchant;
  apiBiexceService: ApiBiexceService = inject(ApiBiexceService);
  ListMerchant(query: QueryAds) {
    return this.apiBiexceService.get<{
        data:AdsModel[],
        meta:PaginationBiexceModel
    }>(
      this.apiRoute.List(),
      query
    );
  }
}
