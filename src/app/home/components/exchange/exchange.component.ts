import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
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
import {
  arrowForward,
  barChart,
  caretDown,
  caretUp,
  cash,
  remove,
  search,
} from 'ionicons/icons';
import * as moment from 'moment';
import {
  BankModel,
  ExchangeBankModel,
  ExchangeFieldModel,
  ExchangeGoldAreaModel,
  ExchangeGoldModel,
  NiceGoldModel,
  PaginationModel,
  QueryExchangeModel,
} from 'src/app/shared/models/exchange.model';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { TradingviewComponent } from 'src/app/components/tradingview/tradingview.component';
import { FlagCurrencyPipe } from 'src/app/shared/pipes/flag-currency.pipe';
import { IconCurrencyPipe } from 'src/app/shared/pipes/icon-currency.pipe';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FlagCurrencyPipe,
    IconCurrencyPipe,
    PaginationComponent,
    FormsModule,
  ],
})
export class ExchangeComponent implements OnChanges, OnInit, OnDestroy {
  @Input() type: string;

  searchKey: string;
  isLoading = false;
  isLoadMore = true;
  query = signal<QueryExchangeModel | null>(null);
  queryBank = signal<QueryExchangeModel | null>(null);
  queryGoldArea = signal<QueryExchangeModel | null>(null);
  data: ExchangeFieldModel[] = [];
  dataGold: ExchangeGoldModel[] = [];
  dataGoldShow: ExchangeGoldModel[] = [];
  dataGoldArea: ExchangeGoldAreaModel[] = [];
  dataGoldAreaShow: ExchangeGoldAreaModel[] = [];
  listBank: BankModel[];
  dataBank: ExchangeBankModel[] = [];
  dataBankShow: ExchangeBankModel[] = [];
  dataNiceGold: NiceGoldModel;
  cryptoOptions: string[] = ['VND', 'USD'];
  goldAreaOptions: string[];
  timeUpdate: string;
  optionFilters: ExchangeFieldModel[];
  metaData: PaginationModel | null;
  intervalId: any;
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
          this.data = data;
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
          this.dataBank = value;
          this.dataBankShow = [...this.dataBank];
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    }
  });
  listenQueryGoldAreaChange = effect(() => {
    if (this.queryGoldArea() != null) {
      this.exchangeService
        .ListGoldArea(this.queryGoldArea()!)
        .then((value) => {
          this.dataGoldArea = value;
          this.dataGoldAreaShow = [...this.dataGoldArea];
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
    addIcons({ barChart, caretDown, caretUp, search, cash, arrowForward, remove });
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.handleReNewData();
    }, 10000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.handleChangeType();
    }
  }

  handleReNewData() {
    if (['MARKET', 'USDT', 'FIAT', 'CRYPTO', 'ECURRENCY'].includes(this.type)) {
      this.query.set({ ...this.query() });
    }

    if (['BANK'].includes(this.type)) {
      this.queryBank.set({ ...this.queryBank() });
    }

    if (['GOLD'].includes(this.type)) {
      this.getGold();
      this.getNiceGold();
    }

    if (['GOLDAREA'].includes(this.type)) {
      this.queryGoldArea.set({ ...this.queryGoldArea() });
      this.getNiceGold();
    }

    if (this.type === 'GOLDREFERENCE') {
      this.handleGoldReference();
      this.getNiceGold();
    }
  }

  handleChangeType() {
    this.resetData();
    this.isLoading = true;
    if (['MARKET', 'USDT', 'FIAT', 'CRYPTO', 'ECURRENCY'].includes(this.type)) {
      let queryData: QueryExchangeModel = {
        page: 1,
        limit: 10,
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
        case 'ECURRENCY':
          queryData.type = 'currency_to_e_currency';
          queryData.source_id = 4;
          break;
        default:
          break;
      }
      this.query.set(queryData);
    }

    if (['BANK'].includes(this.type)) {
      this.getBankOption();
      this.handleBank();
    }

    if (['GOLD'].includes(this.type)) {
      this.getGold();
      this.getNiceGold();
    }

    if (['GOLDAREA'].includes(this.type)) {
      this.getGoldAreaOption();
      this.handleGoldArea();
      this.getNiceGold();
    }

    if (this.type === 'GOLDREFERENCE') {
      this.handleGoldReference();
      this.getNiceGold();
    }
  }

  search(value: string) {
    switch (this.type) {
      case 'MARKET':
      case 'USDT':
      case 'FIAT':
      case 'CRYPTO':
      case 'ECURRENCY':
        this.resetData();
        let queryData = { ...this.query() };
        queryData.search = value;
        queryData.page = 1;
        this.query.set(queryData);
        break;
      case 'BANK':
        this.dataBankShow = this.dataBank.filter((x) =>
          x.exchange_name.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'GOLD':
        this.dataGoldShow = this.dataGold.filter((x) =>
          x.name.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'GOLDAREA':
        this.dataGoldAreaShow = this.dataGoldArea.filter((x) =>
          (x.note + x.type).toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'GOLDREFERENCE':
        this.dataGoldShow = this.dataGold.filter((x) =>
          x.type.toLowerCase().includes(value.toLowerCase())
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
    this.dataBankShow = [];
    this.dataGold = [];
    this.dataGoldShow = [];
    this.dataGoldArea = [];
    this.dataGoldAreaShow = [];
    this.getDate();
  }
  selectCryptoQuery(option: string) {
    if (this.query() !== null && this.query()!.to != option) {
      this.searchKey = '';
      let queryNew = { ...this.query() };
      queryNew.to = option;
      queryNew.page = 1;
      this.query.set(queryNew);
    }
  }

  selectGoldArea(option: string) {
    if (this.queryGoldArea() !== null && this.queryGoldArea()!.area != option) {
      this.searchKey = '';
      let queryNew = { ...this.queryGoldArea() };
      queryNew.area = option;
      this.queryGoldArea.set(queryNew);
    }
  }
  selectBankQuery(bankCode: string) {
    if (this.queryBank() !== null && this.queryBank()!.bank_code != bankCode) {
      this.searchKey = '';
      let queryNew = { ...this.queryBank() };
      queryNew.bank_code = bankCode;
      queryNew.page = 1;
      this.queryBank.set(queryNew);
    }
  }

  async openModalEcurrency(item: any) {}

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

  async openChartGold() {
    const modal = await this.modalCtrl.create({
      component: TradingviewComponent,
      componentProps: {
        widgetConfig: {
          symbol: 'GOLD',
        },
      },
    });
    modal.present();
  }

  getGoldAreaOption() {
    this.exchangeService
      .ListGoldAreaOption({
        client_id: 2,
      })
      .then((value) => {
        this.goldAreaOptions = value;
        if (this.type === 'GOLDAREA') {
          this.handleGoldArea();
        }
      });
  }
  getBankOption() {
    this.exchangeService
      .ListBank({
        client_id: 2,
      })
      .then((value) => {
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
        this.dataGold = value;
        this.dataGoldShow = [...this.dataGold];
      })
      .finally(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }

  handleGoldReference() {
    this.exchangeService
      .ListGoldReference({
        client_id: 2,
      })
      .then((value) => {
        this.dataGold = value;
        this.dataGoldShow = [...this.dataGold];
      })
      .finally(() => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      });
  }
  getNiceGold() {
    this.exchangeService
      .ListNiceGold({
        client_id: 2,
      })
      .then((value) => {
        this.dataNiceGold = value[0];
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

  handleGoldArea() {
    if (this.goldAreaOptions && this.goldAreaOptions.length > 1) {
      let queryData: QueryExchangeModel = {
        client_id: 2,
      };
      queryData.area = this.goldAreaOptions[0];
      this.queryGoldArea.set(queryData);
    }
  }

  pageChanged(page: number) {
    this.searchKey = '';
    let queryN = { ...this.query() };
    queryN.page = page;
    this.query.set(queryN);
  }

  getFieldGoldArea(value: string, type: 'CHANGE' | 'VALUE'): number {
    let regex = /[,|\(|\)]/g;
    value = value.replace(regex, '').trim();
    let arrStr = value.split(' ').filter((x) => x.trim() !== '');
    if (type === 'VALUE') {
      return Number(arrStr[0].trim());
    } else if (type === 'CHANGE') {
      return Number(arrStr[1].trim());
    } else {
      return 0;
    }
  }
}
