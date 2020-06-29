import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from './shared/services/auth.guard';

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: UserLayoutComponent, children: [
        {
          path: '', redirectTo: 'login', pathMatch: 'full'
        },
        {
          path: 'login', component: LoginPageComponent
        },
        {
          path: 'panel', component: PanelComponent, canActivate: [AuthGuard]
        }
      ]}
    ]),
    SharedModule
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard
  ]
})

export class UserModule {

}