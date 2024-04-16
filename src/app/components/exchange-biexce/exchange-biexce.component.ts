import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  ExchangeBiexceFieldModel,
  PaginationBiexceModel,
} from 'src/app/shared/models/exchange-biexce.model';
import { IconCurrencyPipe } from '../../shared/pipes/icon-currency.pipe';
import { addIcons } from 'ionicons';
import { barChart, caretDown, caretUp, search } from 'ionicons/icons';
import { TradingviewComponent } from '../tradingview/tradingview.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { QueryExchangeModel } from 'src/app/shared/models/exchange.model';
import { BehaviorSubject, catchError, from, of, switchMap } from 'rxjs';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { Socket } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-exchange-biexce',
  templateUrl: './exchange-biexce.component.html',
  styleUrls: ['./exchange-biexce.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    IconCurrencyPipe,
    PaginationComponent,
    FormsModule,
  ],
})
export class ExchangeBiexceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() type:
    | 'MARKET'
    | 'GOLD'
    | 'AGRICULTURAL'
    | 'BANK'
    | 'FIAT'
    | 'USDT'
    | 'CRYPTO';

  protected isLoading = signal<boolean>(false);
  protected isFirstLoading = signal<boolean>(true);
  protected isShowChart = signal<boolean>(false);
  protected isShowImage = signal<boolean>(false);
  protected isSearch = signal<boolean>(false);
  protected data = signal<ExchangeBiexceFieldModel[]>([]);
  protected dataSearch = signal<ExchangeBiexceFieldModel[]>([]);
  protected meta = signal<PaginationBiexceModel | null>(null);
  querySub: BehaviorSubject<QueryExchangeModel | null> =
    new BehaviorSubject<QueryExchangeModel | null>(null);
  exchangeService: ExchangeService = inject(ExchangeService);
  private _socket: Socket = inject(Socket);
  searchKey: string;
  constructor(private modalCtrl: ModalController) {
    addIcons({ barChart, caretDown, caretUp, search });
  }
  ngOnDestroy(): void {
    this._socket.emit('leave', 'exchange');
    for (const item of this.socketListeners) {
      this._socket.off(item.event, item.handler);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.handleChangeType();
    }
  }

  protected socketListeners: any[] = [
    {
      event: 'exchange',
      handler: this.handlerSocketExchange.bind(this),
    },
  ];

  handlerSocketExchange(items: ExchangeBiexceFieldModel[]) {
    if (this.dataSearch() && this.dataSearch().length > 0) {
      for (const item of items) {
        const index = this.dataSearch().findIndex(
          (c) =>
            c.baseCurrency === item.baseCurrency &&
            c.targetCurrency === item.targetCurrency
        );
        if (index >= 0) {
          let dataChange = [...this.dataSearch()];
          dataChange[index] = item;
          this.dataSearch.set(dataChange);
        } else {
          // this.collections.push(item)
        }
      }
    }
  }

  handleChangeType() {
    switch (this.type) {
      case 'GOLD':
        this.isShowChart.set(false);
        this.isSearch.set(true);
        this.isShowImage.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'GOLD',
          market: 'FREEMARKET',
          country: 'VN',
        });
        break;
      case 'MARKET':
        this.isShowChart.set(true);
        this.isSearch.set(true);
        this.isShowImage.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'FIAT',
          market: 'FREEMARKET',
          targetCurrency: 'VND',
        });
        break;
      case 'BANK':
        this.isShowChart.set(true);
        this.isSearch.set(true);
        this.isShowImage.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'FIAT',
          market: 'BANK',
          country: 'VN',
        });
        break;
      case 'FIAT':
        this.isShowChart.set(true);
        this.isSearch.set(true);
        this.isShowImage.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'FIAT',
          market: 'FREEMARKET',
          country: 'VN',
        });
        break;
      case 'USDT':
        this.isShowChart.set(true);
        this.isSearch.set(true);
        this.isShowImage.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'FIAT',
          market: 'FREEMARKET',
          country: 'VN',
        });

        break;
      case 'CRYPTO':
        this.isShowChart.set(true);
        this.isSearch.set(true);
        this.isShowImage.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'FIAT',
          market: 'FREEMARKET',
          country: 'VN',
        });

        break;
      case 'AGRICULTURAL':
        this.isShowChart.set(false);
        this.isShowImage.set(false);
        this.isSearch.set(true);
        this.querySub.next({
          limit: 10,
          page: 1,
          type: 'AGRICULTURAL',
          market: 'FREEMARKET',
          country: 'VN',
        });
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.listExchange()?.subscribe({
      next: (result) => {
        this.data.set([...result.data]);
        this.dataSearch.set([...result.data]);
        this.meta.set(result.meta ? { ...result.meta } : null);
        this.isLoading.set(false);
        this.isFirstLoading.set(false);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.isFirstLoading.set(false);
      },
    });

    this._socket.emit('join', 'exchange');
    for (const item of this.socketListeners) {
      this._socket.on(item.event, item.handler);
    }
  }

  listExchange() {
    return this.querySub?.pipe(
      switchMap((query) => {
        if (query == null)
          return of({
            data: [],
            meta: null,
          });
        if (this.isFirstLoading()) {
        } else {
          this.isLoading.set(true);
        }
        return from(this.exchangeService.ListExchangeBiexce(query)).pipe(
          catchError((error) => {
            return of({
              data: [],
              meta: null,
            });
          })
        );
      })
    );
  }

  search(value: string) {
    // this.querySub.next({
    //   ...this.querySub.value,
    //   page: 1,
    //   search: value,
    // });
    let searchs = this.data().filter((x) =>
      x.name.toLowerCase().includes(value.toLowerCase())
    );
    this.dataSearch.set(searchs);
  }

  pageChanged(page: number) {
    this.searchKey = '';
    this.querySub.next({
      ...this.querySub.value,
      page: page,
    });
  }

  async openChart(from: string, to: string) {
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
}
