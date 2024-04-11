import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  ITradingViewWidget,
  IntervalTypes,
  BarStyles,
  Themes,
  SCRIPT_ID,
} from './tradingview-widget.model';
import { ModalController } from '@ionic/angular';

declare const TradingView: any;

@Component({
  selector: 'app-tradingview',
  standalone: true,
  imports: [],
  templateUrl: './tradingview.component.html',
  styleUrl: './tradingview.component.scss',
})
export class TradingviewComponent implements AfterViewInit {
  private _widgetConfig!: ITradingViewWidget;
  private _defaultConfig: ITradingViewWidget = {
    symbol: 'NASDAQ:AAPL',
    allow_symbol_change: true,
    autosize: false,
    enable_publishing: false,
    hideideas: true,
    hide_legend: false,
    changeMode: 'price-and-percent',
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    interval: IntervalTypes.D,
    locale: 'vi_VN',
    save_image: true,
    show_popup_button: false,
    style: BarStyles.CANDLES,
    theme: Themes.LIGHT,
    timezone: 'Etc/UTC',
    toolbar_bg: '#F1F3F6',
    widgetType: 'widget',
    width: '100%',
    height: '100%',
    withdateranges: false,
  };

  private _hasSymbol: Record<string, boolean> = {};
  themeDark: boolean = false;

  style: {} = {};
  containerId: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('widgetConfig') set widgetConfig(value: ITradingViewWidget) {
    this._widgetConfig = value;
    this.cleanWidget();
    this.initWidget();
  }

  get widgetConfig(): ITradingViewWidget {
    return {
      ...this._defaultConfig,
      ...this._widgetConfig,
      theme: this.themeDark ? Themes.DARK : Themes.LIGHT,
    };
  }

  constructor(private modalCtrl: ModalController) {
    this.containerId = 't' + Math.round(Math.random() * 10000) + '';
    if (localStorage.getItem('theme') === 'dark') {
      this.themeDark = true;
    }
  }

  handleClose() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngAfterViewInit(): void {
    this.appendScript(this.initWidget.bind(this));
  }

  initWidget() {
    /* global TradingView */
    if (typeof TradingView === 'undefined' || !this.getContainer()) return;

    const { widgetType, ...widgetConfig } = this.widgetConfig;
    const config = { ...widgetConfig, container_id: this.containerId };

    if (config.autosize) {
      delete config.width;
      delete config.height;
    }

    if (config.popup_width && typeof config.popup_width === 'number') {
      config.popup_width = config.popup_width.toString();
    }

    if (config.popup_height && typeof config.popup_height === 'number') {
      config.popup_height = config.popup_height.toString();
    }

    if (config.autosize) {
      this.style = {
        width: '100%',
        height: '100%',
      };
    }
    /* global TradingView */
    if (!!widgetType) {
      try {
        this._hasSymbol[config.symbol] = false;
        const ab = new TradingView[widgetType]({
          ...config,
          symbol: config.symbol.replace('/', ''),
        });
        ab.ready(() => {
          this._hasSymbol[config.symbol] = true;
        });
        setTimeout(() => {
          if (!this._hasSymbol[config.symbol]) {
            config.symbol = config.symbol.split('/').join('/');
            new TradingView[widgetType]({
              ...config,
              symbol: config.symbol.replace('/', ''),
            });
          }
        }, 1500);
      } catch (e) {
        console.log('noSymbol', e);
      }
    } else
      console.error(
        `Can not create "TradingView", because "widgetType" is missing`
      );
  }

  appendScript(onload: () => any) {
    if (!this.canUseDOM()) {
      onload();
      return;
    }

    if (this.scriptExists()) {
      /* global TradingView */
      if (typeof TradingView === 'undefined') {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = onload;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  canUseDOM() {
    return (
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    );
  }

  scriptExists() {
    return this.getScriptElement() !== null;
  }

  updateOnloadListener(onload: () => any) {
    const script = this.getScriptElement() || ({} as any);
    const oldOnload = script.onload.bind(this);
    return (script.onload = () => {
      oldOnload();
      onload();
    });
  }

  getScriptElement() {
    return document.getElementById(SCRIPT_ID);
  }

  cleanWidget() {
    if (!this.canUseDOM()) return;
    const container = this.getContainer();
    if (container) {
      container.innerHTML = '';
    }
  }

  getContainer() {
    return document.getElementById(this.containerId);
  }
}
