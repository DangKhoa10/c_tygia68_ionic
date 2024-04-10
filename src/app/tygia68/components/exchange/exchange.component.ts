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
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { barChart, caretDown, caretUp } from 'ionicons/icons';
import * as moment from 'moment';
import {
  ExchangeFieldModel,
  QueryExchangeModel,
} from 'src/app/shared/models/exchange.model';
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

  isLoadMore = true;
  query = signal<QueryExchangeModel>({
    page: 1,
  });
  data: ExchangeFieldModel[] = [];

  cryptoOptions: ['VND', 'USD'];

  timeUpdate: string;
  protected exchangeService = inject(ExchangeService);

  listenQueryChange = effect(() => {
    this.exchangeService.ListExchange(this.query()).then((value) => {
      let { data, pagination } = value;
      if (pagination.currentPage == pagination.lastPage) {
        this.isLoadMore = false;
      }
      if (pagination.currentPage > 1) {
        this.data = [...this.data, ...data];
      } else {
        this.data = data;
      }
    });
  });

  getDate() {
    this.timeUpdate = moment().format('DD/MM/yyyy - hh:mm');
  }
  constructor() {
    addIcons({ barChart, caretDown, caretUp });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.handleChangeType();
    }
  }

  handleChangeType() {
    this.getDate();
    this.isLoadMore = true;
    this.data = [];
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

  onIonInfinite(ev: any) {
    if (this.infiniteLoad && this.isLoadMore) {
      let queryNew = { ...this.query() };
      queryNew.page = queryNew.page! + 1;
      this.query.set(queryNew);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
    } else {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }
}
