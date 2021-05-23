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
import { ReportComponent } from '../user/report/report.component';
import { RatingWithCommentComponent } from './components/rating-with-comment/rating-with-comment.component';
import { NewsComponent } from './components/news/news.component';

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
    ChartsModule,
    ReportComponent,
    RatingWithCommentComponent,
    NewsComponent
  ],
  declarations: [CurrencyComponent, ReportComponent, LocationComponent, ChartComponent, RatingWithCommentComponent, NewsComponent]
})
export class SharedModule {

}