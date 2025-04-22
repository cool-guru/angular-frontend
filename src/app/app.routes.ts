import { Routes } from '@angular/router';
import { FoldersComponent } from '@/app/pages/folders/folders.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FoldersComponent,
  },
  {
    path: 'folder/:id',
    component: ProductsComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
