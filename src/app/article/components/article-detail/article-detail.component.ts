import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute } from '@angular/router';

import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  private navController=inject(NavController)
  constructor() {
    addIcons({})
  }
  protected activeRoute: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() {}
  checkCanGoBack() {
    const canGoBack = this.navController.back();
    console.log('Can go back:', this.navController);
    return canGoBack;
  }
}
