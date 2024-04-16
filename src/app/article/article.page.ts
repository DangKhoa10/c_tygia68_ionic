import {
  Component,
  OnInit,
  effect,
  inject,
  signal,
  AfterViewInit,
} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { ArticleService } from '../shared/services/article.service';
import { ArticleModel } from '../shared/models/article.model';
import { QueryModel } from '../shared/models/query.model';
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ArticlePage implements OnInit, AfterViewInit {
  query = signal<QueryModel>({
    page: 1,
    limit: 10,
  });
  isLoadmore: boolean = true;
  infiniteLoad: boolean = false;
  page: Number | undefined;
  protected ArticleService = inject(ArticleService);
  data_first = signal<ArticleModel>({
    code: '',
    created_at: '',
    description: '',
    id: 0,
    image: '',
    link: '',
    title: '',
  });
  data: ArticleModel[];
  loaded: boolean = false;
  lazyLoadImage =
    'https://limosa.vn/wp-content/uploads/2023/08/Loading-la-gi.jpg';
  constructor(public toastController: ToastController) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
   
  }
  async imageWillLoad(e: any) {}
  ListArticle = effect(() => {
    this.ArticleService.ListArticle(this.query()).then((value) => {
      if (value.length == 0) {
        this.isLoadmore = false;
      }
      let query = this.query();
      if (query.page! > 1) {
        this.data = [...this.data, ...value];
      } else {
        let newData = value.shift();
        this.data_first.set(newData!);
        this.data = value;
      }
    });
  });

  onIonInfinite(ev: any) {
    if (this.isLoadmore) {
      let queryN = { ...this.query() };
      queryN.page = queryN.page! + 1;
      this.query.set(queryN);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 1000);
    } else {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }
}
