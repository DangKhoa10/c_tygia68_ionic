import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { ApiService } from './api.service';
import {
  ExchangeBankModel,
  ExchangeGoldAreaModel,
  ExchangeGoldModel,
  ExchangeModel,
  NiceGoldModel,
  QueryExchangeModel,
} from '../models/exchange.model';
import { ApiBiexceService } from './api-biexce.service';
import {
  CurrencyExchangeModel,
  ExchangeBiexceModel,
} from '../models/exchange-biexce.model';

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

  ListGoldReference(query: QueryExchangeModel) {
    return this.apiService.get<ExchangeGoldModel[]>(
      this.apiRoute.GoldReference(),
      query
    );
  }

  ListBank(query: QueryExchangeModel) {
    return this.apiService.get<any[]>(this.apiRoute.ListBank(), query);
  }

  ListBankPrice(id: string, query: QueryExchangeModel) {
    return this.apiService.get<ExchangeBankModel[]>(
      this.apiRoute.Bank(id),
      query
    );
  }

  ListGoldAreaOption(query: QueryExchangeModel) {
    return this.apiService.get<string[]>(
      this.apiRoute.ListGoldAreaOption(),
      query
    );
  }

  ListNiceGold(query: QueryExchangeModel) {
    return this.apiService.get<NiceGoldModel[]>(
      this.apiRoute.NicePrice(),
      query
    );
  }

  ListGoldArea(query: QueryExchangeModel) {
    return this.apiService.get<ExchangeGoldAreaModel[]>(
      this.apiRoute.GoldArea(),
      query
    );
  }

  ListExchangeBiexce(query: QueryExchangeModel) {
    return this.apiBiexceService.get<ExchangeBiexceModel>(
      this.apiRouteBiexce.List(),
      query
    );
  }

  CalculateRate(query: QueryExchangeModel) {
    return this.apiBiexceService.get<{
      rate: number;
    }>(this.apiRouteBiexce.CalculateRate(), query);
  }

  ListCurrencyBiexce(query: QueryExchangeModel) {
    return this.apiBiexceService.get<CurrencyExchangeModel[]>(
      this.apiRouteBiexce.ListCurrencies(),
      query
    );
  }

  ConvertGoldWorld(query: QueryExchangeModel) {
    return this.apiService.get<number[]>(
      this.apiRoute.ConvertGoldWorld(),
      query
    );
  }
  ConvertGold(query: QueryExchangeModel) {
    return this.apiService.get<any[]>(this.apiRoute.ConvertGold(), query);
  }
}
