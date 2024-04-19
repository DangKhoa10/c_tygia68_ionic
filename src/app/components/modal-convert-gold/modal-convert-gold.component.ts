import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { QueryExchangeModel } from 'src/app/shared/models/exchange.model';
import { ExchangeService } from 'src/app/shared/services/exchange.service';

@Component({
  selector: 'app-modal-convert-gold',
  templateUrl: './modal-convert-gold.component.html',
  styleUrls: ['./modal-convert-gold.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, MaskitoDirective],
})
export class ModalConvertGoldComponent implements OnInit, OnDestroy {
  maskOpts: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  });
  goldValue: any = '0';
  valueConvert: any;
  valueChange: any;
  protected exchangeService = inject(ExchangeService);
  intervalId: any;
  isLoading: boolean = false;

  constructor(private modalCtrl: ModalController) {
    addIcons({ chevronBack });
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getGold() {
    this.exchangeService
      .ListGold({
        client_id: 2,
      })
      .then((value) => {
        let data =
          value.find((gold) => gold.code == 'tg')?.sellingPrice?.toString() ??
          '0';
        this.goldValue = maskitoTransform(data, this.maskOpts);
      });
  }

  ngOnInit() {
    this.getGold();
    this.intervalId = setInterval(() => {
      this.getGold();
    }, 10000);
  }

  convert() {
    if (!this.isLoading) {
      const payload = {
        price: Number(this.goldValue.replaceAll(',', '')),
        client_id: 2,
      } as QueryExchangeModel;
      this.isLoading = true;
      this.exchangeService
        .ConvertGold(payload)
        .then((value) => {
          this.valueConvert = maskitoTransform(
            value[0]['1']?.toString() ?? '0',
            this.maskOpts
          );
          this.valueChange = maskitoTransform(
            value[1]['2']?.toString() ?? '0',
            this.maskOpts
          );
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          });
        });
    }
  }
}
