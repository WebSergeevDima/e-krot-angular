import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CurrencyComponent } from './components/currency/currency.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { LocationComponent } from './components/location/location.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    MatCommonModule,
    ChartsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CurrencyComponent,
    CommonModule,
    MatCommonModule,
    LocationComponent,
    ChartComponent,
    ChartsModule
  ],
  declarations: [CurrencyComponent, LocationComponent, ChartComponent]
})
export class SharedModule {

}