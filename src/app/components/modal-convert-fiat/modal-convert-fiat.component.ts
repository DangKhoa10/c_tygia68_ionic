import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { maskitoNumberOptionsGenerator } from '@maskito/kit';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { CurrencyPrecision } from 'src/app/shared/libs/currency';
import { CurrencyExchangeModel } from 'src/app/shared/models/exchange-biexce.model';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
@Component({
  selector: 'app-modal-convert-fiat',
  standalone: true,
  imports: [IonicModule, FormsModule, MaskitoDirective, CommonModule],
  templateUrl: './modal-convert-fiat.component.html',
  styleUrls: ['./modal-convert-fiat.component.scss'],
})
export class ModalConvertFiatComponent implements OnInit {
  maskOpts: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  });
  maskOptsValue: MaskitoOptions = maskitoNumberOptionsGenerator({
    decimalSeparator: '.',
    thousandSeparator: ',',
    precision: 8,
  });
  value: any = '0';
  from: string = 'VND';
  to: string = 'USD';
  valueConvert: any;
  isLoading: boolean = false;
  protected exchangeService = inject(ExchangeService);

  constructor(private modalCtrl: ModalController) {
    addIcons({ chevronBack });
  }
  ngOnInit(): void {
    this.getCurrency();
  }
  options: CurrencyExchangeModel[];
  convert() {
    this.isLoading = true;
    this.maskOptsValue = maskitoNumberOptionsGenerator({
      decimalSeparator: '.',
      thousandSeparator: ',',
      precision: CurrencyPrecision[this.to],
    });
    this.exchangeService
      .CalculateRate({
        from: this.from.toString(),
        to: this.to.toString(),
        country: 'VN',
      })
      .then((data) => {
        let rate = data.rate;
        let convertNumber = Number(this.value.replaceAll(',', ''));
        this.valueConvert = maskitoTransform(
          (rate * convertNumber).toString(),
          this.maskOptsValue
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getCurrency() {
    this.exchangeService.ListCurrencyBiexce({ country: 'VN' }).then((data) => {
      this.options = data;
    });
  }
}
