import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  private navController = inject(NavController);
  protected id: string;
  protected param: string;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  loaded:boolean=false
  constructor() {
    addIcons({ back: chevronBackOutline });
  }

  ngOnInit() {
    this.param = this.route.snapshot.url[0].path;
    this.id = this.route.snapshot.params['id'];
  }
  imageWillLoad(e:any){

  }
  checkCanGoBack() {
    const canGoBack = this.navController.back();
    console.log('Can go back:', this.navController);
    return canGoBack;
  }
}
