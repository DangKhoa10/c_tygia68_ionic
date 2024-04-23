import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { PostModel, QueryPost } from 'src/app/shared/models/ads.model';
import { MerchantService } from 'src/app/shared/services/merchant.service';
@Component({
  selector: 'app-ads-detail',
  templateUrl: './ads-detail.component.html',
  styleUrls: ['./ads-detail.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class AdsDetailComponent implements OnInit {
  @Input() idAr: any;
  dataMerchant = signal<PostModel | null>(null);
  loaded: boolean = false;
  merchantService: MerchantService = inject(MerchantService);
  constructor(private modalCtrl: ModalController) {
    addIcons({ back: chevronBackOutline });
  }

  ngOnInit() {
    console.log(this.idAr);
    this.getArticleDetail(this.idAr);
  }
  getArticleDetail(id: number) {
    return this.merchantService.getDetail(id).then((data) => {
      const { detail } = data;
      this.dataMerchant.set(detail);
    });
  }
  async imageWillLoad(e: any) {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
