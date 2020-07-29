import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';


//for translate paginator
import { TranslateRuPaginator } from 'src/app/shared/components/paginator/translate-ru-paginator';


const matModules = [
  MatButtonModule,
  MatIconModule,
  MatGridListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [],
  imports: matModules,
  exports: matModules,
  providers: [
    { provide: MatPaginatorIntl, useValue: TranslateRuPaginator() }
  ]
})
export class MaterialModule { }
