import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { ApiService } from './api.service';
import { ExchangeModel } from '../models/exchange.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  public apiRoute = ApiUrl.Exchange;
  apiService: ApiService = inject(ApiService);

  ListExchange(query: any) {
    return this.apiService.get<ExchangeModel>(
      this.apiRoute.ListExchange(),
      query
    );
  }
}
