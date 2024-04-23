import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdsModel, QueryAds } from '../shared/models/ads.model';
import { PaginationBiexeModel } from '../shared/models/pagination.model';
import { AdsService } from '../shared/services/ads.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
  standalone: true,
  imports: [SharedModule,PaginationComponent],
})
export class AdsPage implements OnInit {
  query = signal<QueryAds>({
    page: 1,
    limit: 50,
    key: 'merchant',
  });
  dataAds: AdsModel[];
  protected meta = signal<PaginationBiexeModel | null>(null);
  adsService: AdsService = inject(AdsService);
  constructor() {}

  ngOnInit() {}
  ListMerchant = effect(() => {
    this.adsService.ListMerchant(this.query()).then((result) => {
      const { data, meta } = result;
      this.dataAds = data;
      console.log(data);
      this.meta.set(meta ? { ...meta } : null);
    });
  });
}
