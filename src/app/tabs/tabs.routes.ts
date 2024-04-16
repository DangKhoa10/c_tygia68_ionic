import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'tygia68',
        loadComponent: () =>
          import('../tygia68/tygia68.page').then((m) => m.Tygia68Page),
      },
      {
        path: 'article',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../article/article.page').then((m) => m.ArticlePage),
          },
        ],
      },
      {
        path: 'ads',
        loadComponent: () => import('../ads/ads.page').then((m) => m.AdsPage),
      },
      {
        path: '',
        redirectTo: '/tygia68',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'article',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('../article/components/article-detail/article-detail.component').then((m) => m.ArticleDetailComponent),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];
