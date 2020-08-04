import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CurrencyComponent } from './components/currency/currency.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { LocationComponent } from './components/location/location.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { ChartComponent } from './components/chart/chart.component';
@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    AgChartsAngularModule,
    MatCommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CurrencyComponent,
    CommonModule,
    AgChartsAngularModule,
    MatCommonModule,
    LocationComponent,
    ChartComponent
  ],
  declarations: [CurrencyComponent, LocationComponent, ChartComponent]
})
export class SharedModule {

}