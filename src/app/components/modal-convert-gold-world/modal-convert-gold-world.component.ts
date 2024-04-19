import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { FormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { QueryExchangeModel } from 'src/app/shared/models/exchange.model';
@Component({
  selector: 'app-modal-convert-gold-world',
  templateUrl: './modal-convert-gold-world.component.html',
  styleUrls: ['./modal-convert-gold-world.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, MaskitoDirective],
})
export class ModalConvertGoldWorldComponent implements OnInit, OnDestroy {
  maskOpts: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  });
  goldValue: any = '0';
  exchangeValue: any = '0';
  valueConvert: any;
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

  getExchange() {
    this.exchangeService
      .ListExchangeBiexce({
        limit: 10,
        page: 1,
        type: 'FIAT',
        market: 'FREEMARKET',
        targetCurrency: 'VND',
      })
      .then((value) => {
        let exchangeData = value.data;
        if (exchangeData.length > 0) {
          let data =
            exchangeData
              .find((e) => e.baseCurrency == 'USD' && e.targetCurrency == 'VND')
              ?.priceBuy?.toString() ?? '0';
          this.exchangeValue = maskitoTransform(data, this.maskOpts);
        } else {
          this.exchangeValue = '0';
        }
      });
  }

  ngOnInit() {
    this.getGold();
    this.getExchange();
    this.intervalId = setInterval(() => {
      this.getGold();
      this.getExchange();
    }, 10000);
  }

  convert() {
    if (!this.isLoading) {
      const payload = {
        rate: Number(this.exchangeValue.replaceAll(',', '')),
        price: Number(this.goldValue.replaceAll(',', '')),
        client_id: 2
      } as QueryExchangeModel;
      this.isLoading = true;
      this.exchangeService
        .ConvertGoldWorld(payload)
        .then((value) => {
          this.valueConvert = maskitoTransform(
            value[0]?.toString() ?? '0',
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
