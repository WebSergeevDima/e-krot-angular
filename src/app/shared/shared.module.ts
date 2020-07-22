import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';

const modules = [
  ReactiveFormsModule,
  HttpClientModule,
  MaterialModule
]
@NgModule({
  imports: modules,
  exports: modules
})
export class SharedModule {

}