import { Injectable, inject } from '@angular/core';
import { ApiUrl } from '../configs/api_url';
import { ApiService } from './api.service';
import {
  ChargedModel,
  QueryChargedModel,
  TotalCharged,
} from '../models/charged.model';
@Injectable({
  providedIn: 'root',
})
export class ChargedService {
  public apiRoute = ApiUrl.Charged;
  apiService: ApiService = inject(ApiService);
  Charged(payload: QueryChargedModel, params: QueryChargedModel) {
    return this.apiService.post<{
      scheduleLoan: ChargedModel[];
      total: TotalCharged;
    }>(this.apiRoute.calculateloan(), payload, params);
  }
}
