import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

const matModules = [
  MatButtonModule, 
  MatIconModule, 
  MatGridListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatExpansionModule
]

@NgModule({
  declarations: [],
  imports: matModules,
  exports: matModules
})
export class MaterialModule { }
