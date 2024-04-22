import { Component, OnInit, inject, signal } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { NgForm } from '@angular/forms';
import { ArticleService } from 'src/app/shared/services/article.service';
import {
  ArticleModel,
  QueryArticle,
} from 'src/app/shared/models/article.model';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  protected sourceHMTLContent: SafeHtml;
  private navController = inject(NavController);
  protected id: string;
  protected param: string;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected ArticleService = inject(ArticleService);
  protected articleSingle = signal<ArticleModel | null>(null);
  queryArti = signal<QueryArticle | null>(null);
  loaded: boolean = false;
  constructor(private sanitizer: DomSanitizer) {
    addIcons({ back: chevronBackOutline });
  }

  ngOnInit() {
    this.param = this.route.snapshot.url[0].path;
    this.id = this.route.snapshot.params['id'];
    this.getArticleDetail(this.id);
  }

  imageWillLoad(e: any) {}
  getArticleDetail(id: string) {
    const payload = {
      code: id,
    };
    return this.ArticleService.getArticle(payload).then((item) => {
      this.articleSingle.set(item);
      this.sourceHMTLContent = this.sanitizer.bypassSecurityTrustHtml(
        item.description
      );
    });
  }
  checkCanGoBack() {
    const canGoBack = this.navController.back();
    console.log('Can go back:', this.navController);
    return canGoBack;
  }
}
