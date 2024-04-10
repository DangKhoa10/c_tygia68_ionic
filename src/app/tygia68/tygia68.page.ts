import {
  Component,
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { notifications } from 'ionicons/icons';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { values } from 'lodash';

@Component({
  selector: 'app-tygia68',
  templateUrl: './tygia68.page.html',
  styleUrls: ['./tygia68.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ExchangeComponent],
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

  constructor() {
    addIcons({ notifications });
  }
}
