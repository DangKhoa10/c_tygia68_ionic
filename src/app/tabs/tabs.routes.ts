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
        path: '',
        redirectTo: '/home',
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
