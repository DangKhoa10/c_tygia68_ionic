import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PostModel, QueryPost } from '../shared/models/ads.model';
import { PaginationBiexeModel } from '../shared/models/pagination.model';
import { MerchantService } from '../shared/services/merchant.service';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { AdsDetailComponent } from './components/ads-detail/ads-detail.component';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.page.html',
  styleUrls: ['./ads.page.scss'],
  standalone: true,
  imports: [SharedModule, PaginationComponent],
})
export class AdsPage implements OnInit {
  query = signal<QueryPost>({
    page: 1,
    limit: 10,
    key: 'merchant',
  });
  dataAds: PostModel[];
  protected meta = signal<PaginationBiexeModel | null>(null);
  adsService: MerchantService = inject(MerchantService);
  isLoadmore: boolean = true;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  ListMerchant = effect(() => {
    this.adsService.ListMerchant(this.query()).then((result) => {
      const { data, meta } = result;
      this.dataAds = data;
      this.meta.set(meta ? { ...meta } : null);
      if(this.query().page === meta?.pageCount){
          this.isLoadmore=false
      }
      
    });
  });
  async openModal(id: number) {
    const modalCHARGED = await this.modalCtrl.create({
      component: AdsDetailComponent,
      componentProps: {
        idAr: id,
      },
    });
    modalCHARGED.present();
  }
  onIonInfinite(ev: any) {
    if (this.isLoadmore) {
      let queryN = { ...this.query() };
      queryN.page = queryN.page! + 1;
      this.query.set(queryN);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 1000);
    } else {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }
}
