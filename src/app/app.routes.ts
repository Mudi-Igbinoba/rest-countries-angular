import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailPageComponent } from './detail-page/detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'detail/:id',
    component: DetailPageComponent,
  },
];
