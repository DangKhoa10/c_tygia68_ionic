import { Component, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ExchangeBiexceComponent } from '../components/exchange-biexce/exchange-biexce.component';

@Component({
  selector: 'app-home',
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExchangeComponent,
    HeaderComponent,ExchangeBiexceComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  valueChoose = signal<string>('MARKET');
  valueChoose_2 = signal<string>('USDT');
  valueChoose_gold = signal<string>('GOLD');
  options = [
    {
      value: 'MARKET',
      label: 'Thị trường',
    },

    {
      value: 'BANK',
      label: 'Ngân hàng',
    },

    {
      value: 'FIAT',
      label: 'Ngoại tệ',
    },
  ];
  options1 = [
    {
      value: 'USDT',
      label: 'USDT',
    },
    {
      value: 'CRYPTO',
      label: 'Crypto',
    },
  ];
  option2 = [
    {
      value: 'GOLD',
      label: 'Giá vàng',
    },
    {
      value: 'AREA',
      label: 'Giá vàng khu vực',
    },
  ];
  title: string;
  constructor() {}
  selectValue(value: string) {
    this.valueChoose.set(value);
  }
  handleChang(value: string) {
    this.valueChoose_2.set(value);
  }
  handleChangGold(value: string) {
    this.valueChoose_gold.set(value);
  }
  ngOnInit() {}
  listenValueChange = effect(() => {
    this.title =
      this.options.find((x) => x.value === this.valueChoose())?.label ?? '';
  });
}
