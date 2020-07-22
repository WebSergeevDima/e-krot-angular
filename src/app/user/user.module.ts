import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from './shared/services/auth.guard';
import { RolesService } from '../shared/services/roles.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    PanelComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [
          {
            path: '', redirectTo: 'login', pathMatch: 'full'
          },
          {
            path: 'login', component: LoginPageComponent
          },
          {
            path: 'panel', component: PanelComponent, canActivate: [AuthGuard]
          }
        ]
      }
    ]),
    SharedModule
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    RolesService
  ]
})

export class UserModule {

}