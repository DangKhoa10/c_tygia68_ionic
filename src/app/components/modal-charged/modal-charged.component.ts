import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack, time } from 'ionicons/icons';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { MaskitoOptions } from '@maskito/core';
import { MaskitoDirective } from '@maskito/angular';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { QueryExchangeModel } from 'src/app/shared/models/exchange.model';
import {
  QueryChargedModel,
  ChargedModel,
  TotalCharged,
} from 'src/app/shared/models/charged.model';
import { ChargedService } from 'src/app/shared/services/charged.service';
@Component({
  selector: 'app-modal-charged',
  templateUrl: './modal-charged.component.html',
  styleUrls: ['./modal-charged.component.scss'],
  standalone: true,
  imports: [SharedModule, MaskitoDirective],
})
export class ModalChargedComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {
    addIcons({ chevronBack });
  }

  maskOpts: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  });
  exchangeValue: any = '';
  time: any;
  interest: any;
  interest_type_id: any = 1;
  time_unit_id: any = 1;
  price_unit_id: any = 1;
  protected exchangeService = inject(ExchangeService);
  protected chargedService = inject(ChargedService);
  intervalId: any;
  isLoading: boolean = false;
  dataCharged: ChargedModel[];
  totalCharged: TotalCharged;
  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {}
  customPopoverOptions = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color',
  };
  charged() {
    if (!this.isLoading) {
      const params = { client_id: 2 };
      const payload = {
        amount: Number(this.exchangeValue.replaceAll(',', '')),
        interest: Number(this.interest),
        interest_type_id: Number(this.interest_type_id),
        price_unit_id: this.price_unit_id,
        time: Number(this.time),
        time_unit_id: Number(this.time_unit_id),
      } as QueryChargedModel;
      this.isLoading = true;
      this.chargedService
        .Charged(payload, params)
        .then(value => {
          console.log('value');
          this.dataCharged = value.scheduleLoan.map((item) => {
            return {} as ChargedModel;
          });
          this.totalCharged = value.total;
        })
        .catch((err)=>{
          console.log(err);
        })
        .finally(() => {
          console.log("aaaa");
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        });
    }
  }
}
