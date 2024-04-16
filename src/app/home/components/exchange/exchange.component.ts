import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonicModule,
  ModalController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { barChart, caretDown, caretUp, search } from 'ionicons/icons';
import * as moment from 'moment';
import {
  BankModel,
  ExchangeBankModel,
  ExchangeFieldModel,
  ExchangeGoldModel,
  PaginationModel,
  QueryExchangeModel,
} from 'src/app/shared/models/exchange.model';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { TradingviewComponent } from 'src/app/components/tradingview/tradingview.component';
import { FlagCurrencyPipe } from 'src/app/shared/pipes/flag-currency.pipe';
import { IconCurrencyPipe } from 'src/app/shared/pipes/icon-currency.pipe';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';


@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FlagCurrencyPipe, IconCurrencyPipe,PaginationComponent],
})
export class ExchangeComponent implements OnChanges, OnInit {
  @Input() showTitle: boolean = true;
  @Input() type: string;
  @Input() type_2: string;
  @Input() title: string;
  @Input() title_2: string;
  @Input() limit: number = 5;
  @Input() infiniteLoad: boolean = false;

  isLoading = false;
  isLoadMore = true;
  query = signal<QueryExchangeModel | null>(null);
  queryBank = signal<QueryExchangeModel | null>(null);
  data: ExchangeFieldModel[] = [];
  dataGold: ExchangeGoldModel[] = [];
  dataBank: ExchangeBankModel[] = [];
  cryptoOptions: string[] = ['VND', 'USD'];
  listBank: BankModel[];
  timeUpdate: string;
  showSearch: boolean = false;
  dataBankSearch: ExchangeBankModel[] = [];
  optionFilters: ExchangeFieldModel[];
  metaData: PaginationModel | null;
  protected exchangeService = inject(ExchangeService);

  listenQueryChange = effect(() => {
    if (this.query() != null) {
      this.exchangeService
        .ListExchange(this.query()!)
        .then((value) => {
          let { data, pagination } = value;
          this.metaData = pagination ? { ...pagination } : null;
          if (pagination.currentPage == pagination.lastPage) {
            this.isLoadMore = false;
          }
          if (pagination.currentPage > 1) {
            this.data = [...this.data, ...data];
          } else {
            this.data = data;
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  });
  listenQueryBankChange = effect(() => {
    if (this.queryBank() != null) {
      this.exchangeService
        .ListBankPrice(this.queryBank()?.bank_code ?? '', this.queryBank()!)
        .then((value) => {
          if (this.limit == 5 && !this.infiniteLoad) {
            this.dataBank = value.splice(0, 5);
          } else {
            this.dataBank = value;
          }
          this.dataBankSearch = [...this.dataBank];
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  });

  getDate() {
    this.timeUpdate = moment().format('DD/MM/yyyy - hh:mm');
  }

  constructor(private modalCtrl: ModalController) {
    addIcons({ barChart, caretDown, caretUp, search });
  }
  ngOnInit(): void {
    this.getBankOption();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.handleChangeType();
    }
  }

  handleChangeType() {
    this.resetData();
    this.showSearch = false;
    this.isLoading = true;
    if (['MARKET', 'USDT', 'FIAT', 'CRYPTO'].includes(this.type)) {
      let queryData: QueryExchangeModel = {
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
          queryData.to = this.cryptoOptions[0];
          queryData.type = 'coin_to_fiat';
          break;
        default:
          break;
      }
      this.query.set(queryData);
    }

    if (['BANK'].includes(this.type)) {
      this.handleBank();
    }

    if (['GOLD'].includes(this.type)) {
      this.getGold();
    }
  }

  cancelSearch() {
    this.showSearch = false;
  }

  search(event: any) {
    let value = event.detail.value;
    switch (this.type) {
      case 'MARKET':
      case 'USDT':
      case 'FIAT':
      case 'CRYPTO':
        this.resetData();
        let queryData = { ...this.query() };
        queryData.search = value;
        queryData.page = 1;
        this.query.set(queryData);
        break;
      case 'BANK':
        this.dataBankSearch = this.dataBank.filter((x) =>
          x.exchange_name.toLowerCase().includes(value.toLowerCase())
        );
        break;
      default:
        break;
    }
  }
  resetData() {
    this.isLoadMore = true;
    this.data = [];
    this.dataBank = [];
    this.dataBankSearch = [];
    this.dataGold = [];
    this.getDate();
  }
  selectCryptoQuery(option: string) {
    if (this.query() !== null && this.query()!.to != option) {
      this.resetData();
      let queryNew = { ...this.query() };
      queryNew.to = option;
      queryNew.page = 1;
      this.query.set(queryNew);
    }
  }
  selectBankQuery(bankCode: string) {
    if (this.queryBank() !== null && this.queryBank()!.bank_code != bankCode) {
      this.resetData();
      let queryNew = { ...this.queryBank() };
      queryNew.bank_code = bankCode;
      queryNew.page = 1;
      this.queryBank.set(queryNew);
    }
  }

  async openChart(from: string, to: string) {
    if (this.type === 'CRYPTO' && to === 'VND') {
      to = 'USD';
    }
    const modal = await this.modalCtrl.create({
      component: TradingviewComponent,
      componentProps: {
        widgetConfig: {
          symbol: from + '/' + to,
        },
      },
    });
    modal.present();
  }

  onIonInfinite(ev: any) {
    if (this.infiniteLoad && this.isLoadMore && this.type != 'GOLD') {
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

  getBankOption() {
    this.exchangeService
      .ListBank({
        client_id: 2,
      })
      .then((value) => {
        console.log(value);
        this.listBank = value[0];
        if (this.type === 'BANK') {
          this.handleBank();
        }
      });
  }

  getGold() {
    this.exchangeService
      .ListGold({
        client_id: 2,
      })
      .then((value) => {
        if (this.limit == 5 && !this.infiniteLoad)
          this.dataGold = value.splice(0, 5);
        else this.dataGold = value;
      })
      .finally(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }

  handleBank() {
    if (this.listBank && this.listBank.length > 0) {
      let queryData: QueryExchangeModel = {
        client_id: 2,
      };
      queryData.bank_code = this.listBank[0].code_bank;
      this.queryBank.set(queryData);
    }
  }

  handleSearch() {
    this.showSearch = !this.showSearch;
  }
}
