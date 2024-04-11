import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { ApiService } from './api.service';
import {
  BankModel,
  ExchangeBankModel,
  ExchangeGoldModel,
  ExchangeModel,
  QueryExchangeModel,
} from '../models/exchange.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  public apiRoute = ApiUrl.Exchange;
  apiService: ApiService = inject(ApiService);

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
}
