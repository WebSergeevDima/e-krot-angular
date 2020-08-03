import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './shared/components/user-layout/user-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../shared/services/auth.service';
import { PanelComponent } from './panel/panel.component';
import { AuthGuard } from './shared/services/auth.guard';
import { RolesService } from '../shared/services/roles.service';
import { HeaderComponent } from './header/header.component';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { DialogRegistrationComponent } from '../shared/components/dialog-registration/dialog-registration.component';
import { ReportComponent } from './report/report.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    PanelComponent,
    HeaderComponent,
    DialogComponent,
    DialogRegistrationComponent,
    ReportComponent,
    ReportsComponent
  ],
  imports: [
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
            path: 'panel', component: PanelComponent, canActivate: [AuthGuard], children: [
              {
                path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]
              },
              {
                path: 'reports/report/:uniqId', component: ReportComponent, canActivate: [AuthGuard]
              }
            ]
          }
        ]
      }
    ]),
    SharedModule
  ],
  exports: [RouterModule, MaterialModule],
  providers: [
    AuthService,
    AuthGuard,
    RolesService
  ]
})

export class UserModule {

}