import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tygia68',
        loadComponent: () =>
          import('../tygia68/tygia68.page').then((m) => m.Tygia68Page),
      },
      {
        path: 'article',
        loadComponent: () =>
          import('../article/article.page').then((m) => m.ArticlePage),
      },
      {
        path: 'ads',
        loadComponent: () =>
          import('../ads/ads.page').then((m) => m.AdsPage),
      },
      {
        path: '',
        redirectTo: '/tygia68',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/tygia68',
    pathMatch: 'full',
  },
];
