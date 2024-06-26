import {
  Component,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notifications } from 'ionicons/icons';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeBiexceComponent } from '../components/exchange-biexce/exchange-biexce.component';

@Component({
  selector: 'app-tygia68',
  templateUrl: './tygia68.page.html',
  styleUrls: ['./tygia68.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExchangeComponent, ExchangeBiexceComponent],
})
export class Tygia68Page {
  valueChoose = signal<string>('ALL');
  options = [
    {
      value: 'ALL',
      label: 'Trang chủ',
    },
    {
      value: 'MARKET',
      label: 'Thị trường',
    },
    {
      value: 'USDT',
      label: 'USDT',
    },
    {
      value: 'BANK',
      label: 'Ngân hàng',
    },
    {
      value: 'GOLD',
      label: 'Vàng',
    },
    {
      value: 'CRYPTO',
      label: 'Crypto',
    },
    {
      value: 'FIAT',
      label: 'Ngoại tệ',
    },
  ];
  title: string;
  listenValueChange = effect(() => {
    this.title =
      this.options.find((x) => x.value === this.valueChoose())?.label ?? '';
  });

  selectValue(value: string) {
    this.valueChoose.set(value);
  }
  constructor() {
    addIcons({ notifications });
  }
}
