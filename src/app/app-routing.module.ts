import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home/home.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { ProductsComponent } from './component/products/products.component';
import { NewproductComponent } from './component/newproduct/newproduct.component';

const routes: Routes = [
  { path: 'profile', loadChildren: () => import('./component/profile/user.module').then(module => module.UserModule) },
  { path: 'products', component: ProductsComponent, canActivate: [AuthenticationGuard] },
  { path: 'products/new', component: NewproductComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HomeComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
