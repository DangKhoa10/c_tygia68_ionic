import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
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
export class ArticlePage implements OnInit {
  post: any = [
    {
      id: 1,
      images:
        'https://tygia68.com/wp-content/uploads/2023/07/ty-gia-usd-hom-nay-217-tiep-da-tang.png',
      title: 'Tỷ giá USD hôm nay 9/4: Trượt dốc trước dữ liệu lạm phát',
      sub: 'Với tần suất Bitcoin liên tục đạt hỗ trợ cao hơn kết hợp với sự ổn định trên thị trường... from Giá Bitcoin hôm nay 9/4: Khó giảm về 50.000 USD',
    },
    {
      id: 2,
      images:
        'https://tygia68.com/wp-content/uploads/2023/06/gia-vang-156-tiep-tuc-suy-yeu-1.png',
      title: 'Giá vàng hôm nay 9/4: Tăng mạnh',
      sub: 'Chỉ số US Dollar Index (DXY) đo lường biến động đồng bạc xanh với 6 đồng tiền chủ chốt (EUR,... from Tỷ giá USD hôm nay 9/4: Trượt dốc trước dữ liệu lạm phát',
    },
    {
      id: 3,
      images:
        'https://tygia68.com/wp-content/uploads/2023/08/gia-bitcoin-hom-nay-248-giu-gia-on-dinh-1.png',
      title: 'Giá Bitcoin hôm nay 8/4: Củng cố vị thế dài hạn trên thị trường',
      sub: 'Giá vàng các thương hiệu trong nước được điều chỉnh tăng mạnh với mức tăng cao nhất lên tới gần... from Giá vàng hôm nay 9/4: Tăng mạnh',
    },
  ];
  items: any = [];
  query = signal<QueryModel>({
    page: 1,
    limit: 10,
  });
  isLoadmore: boolean = true;
  infiniteLoad: boolean = false;
  protected ArticleService = inject(ArticleService);
  data: ArticleModel[];
  constructor() {}

  ngOnInit() {
    const date = new Date();
    this.generateItems();
    this.ListArticle();
  }

  private generateItems() {
    for (let i = 0; i < this.post.length; i++) {
      this.items.push(this.post[i]);
    }
  }
  ListArticle() {
    this.ArticleService.ListArticle(this.query()).then((value) => {
      console.log(value);
      let {} = value;
      this.data = value;
      // if (pagination.currentPage == pagination.lastPage) {
      //   this.isLoadMore = false;
      // }
      // if (pagination.currentPage > 1) {
      //   this.data = [...this.data, ...data];
      // } else {
      //   this.data = data;
      // }
    });
  }
  onIonInfinite(ev: any) {
    if (this.infiniteLoad && this.isLoadmore) {
      let queryN = { ...this.query() };
      queryN.page = queryN.page! + 1;
      this.query.set(queryN);
      console.log(queryN);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
    } else {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }
  }
}
