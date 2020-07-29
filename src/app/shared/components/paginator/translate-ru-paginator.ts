import { MatPaginatorIntl } from '@angular/material/paginator';


export function TranslateRuPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();
  
  customPaginatorIntl.itemsPerPageLabel = 'На странице:'
  customPaginatorIntl.previousPageLabel = 'Предыдущая страница'
  customPaginatorIntl.nextPageLabel = 'Следующая страница'
  
  return customPaginatorIntl;
}