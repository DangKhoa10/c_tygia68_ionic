import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { ApiService } from './api.service';
import {
  ExchangeBankModel,
  ExchangeGoldModel,
  ExchangeModel,
  QueryExchangeModel,
} from '../models/exchange.model';
import { ApiBiexceService } from './api-biexce.service';
import { ExchangeBiexceModel } from '../models/exchange-biexce.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  public apiRoute = ApiUrl.Exchange;
  public apiRouteBiexce = ApiUrl.Biexce.Exchange;
  apiService: ApiService = inject(ApiService);
  apiBiexceService: ApiBiexceService = inject(ApiBiexceService);

  ListExchange(query: QueryExchangeModel) {
    return this.apiService.get<ExchangeModel>(
      this.apiRoute.ListExchange(),
      query
    );
  }

  ListGold(query: QueryExchangeModel) {
    return this.apiService.get<ExchangeGoldModel[]>(
      this.apiRoute.GoldPrice(),
      query
    );
  }

  ListBank(query: QueryExchangeModel) {
    return this.apiService.get<any[]>(this.apiRoute.ListBank(), query);
  }

  ListBankPrice(id: string, query: QueryExchangeModel) {
    return this.apiService.get<ExchangeBankModel[]>(this.apiRoute.Bank(id), query);
  }

  ListExchangeBiexce(query: QueryExchangeModel){
    return this.apiBiexceService.get<ExchangeBiexceModel>(this.apiRouteBiexce.List(), query);
  }
}
