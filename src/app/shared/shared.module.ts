import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [  
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,  
  CurrencyComponent 
  ],
  declarations: [CurrencyComponent]
})
export class SharedModule {

}