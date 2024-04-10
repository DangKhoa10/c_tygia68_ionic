import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  effect,
  inject,
  signal,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import * as moment from 'moment';
import { ExchangeService } from 'src/app/shared/services/exchange.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ExchangeComponent implements OnChanges {
  @Input() showTitle: boolean = true;
  @Input() type: string;
  @Input() title: string;
  @Input() limit: number = 5;
  @Input() infiniteLoad: boolean = false;

  query = signal<Object>({});
  data: Object[];

  cryptoOptions: ['VND', 'USD'];

  timeUpdate: string;
  protected exchangeService = inject(ExchangeService);

  listenQueryChange = effect(() => {
    this.exchangeService.ListExchange(this.query()).then((value) => {
      this.data = value.data;
    });
  });

  getDate() {
    this.timeUpdate = moment().format('DD/MM/yyyy - hh:mm');
  }
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.handleChangeType();
    }
  }

  handleChangeType() {
    this.getDate();
    if (['MARKET', 'USDT', 'FIAT', 'CRYPTO'].includes(this.type)) {
      let queryData = {
        page: 1,
        limit: this.limit,
        client_id: 2,
        type: '',
      };
      switch (this.type) {
        case 'MARKET':
          queryData.type = 'market_price';
          break;
        case 'USDT':
          queryData.type = 'usdt_to_fiat';
          break;
        case 'FIAT':
          queryData.type = 'fiat_to_fiat';
          break;
        case 'CRYPTO':
          queryData.type = 'coin_to_fiat';
          // query.to = this.cryptoOptions[0];
          break;
        default:
          break;
      }
      this.query.set(queryData);
    }

    if (['BANK'].includes(this.type)) {
    }

    if (['GOLD'].includes(this.type)) {
    }
  }
}
