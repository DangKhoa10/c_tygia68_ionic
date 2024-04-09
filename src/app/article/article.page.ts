import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import * as moment from 'moment';
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
  formattedDate:any
  constructor() {}

  ngOnInit() {
    const date = new Date();
    this.formattedDate = moment(date).format('DD/MM/YYYY');
    console.log(this.formattedDate); // In ra ngày, tháng và năm hiện tại với định dạng "12-04-2024"
  }
}
