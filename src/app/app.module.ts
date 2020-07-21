import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoService } from './shared/services/auto.service';
import { AuthService } from './shared/services/auth.service';
import { RegistrationService } from './registration-page/services/registration.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AutoPricePageComponent } from './auto-price-page/auto-price-page.component';
import { AutoMarketPageComponent } from './auto-market-page/auto-market-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SharedModule } from './shared/shared.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RolesService } from './shared/services/roles.service';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    AutoPricePageComponent,
    AutoMarketPageComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    AutoService,
    AuthService,
    RegistrationService,
    RolesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
