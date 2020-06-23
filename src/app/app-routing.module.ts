import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AutoPricePageComponent } from './auto-price-page/auto-price-page.component';
import { AutoMarketPageComponent } from './auto-market-page/auto-market-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'auto', component: AutoPricePageComponent },
      { path: 'auto-market', component: AutoMarketPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'registration', component: RegistrationPageComponent }
    ]
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
