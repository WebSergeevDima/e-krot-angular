import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { PriceComparisonsService } from '../shared/services/price-comparisons.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-auto-price-comparisons-page',
  templateUrl: './auto-price-comparisons-page.component.html',
  styleUrls: ['./auto-price-comparisons-page.component.scss']
})
export class AutoPriceComparisonsPageComponent implements OnInit {

  public cur
  public allReports = []
  public reportPage = []
  public pageIndex: number = 0
  public pageSize: number = 10
  public length: number = 0
  public loadingBlock = true

  public filter = {'city': [
      {
        'name': 'Беларусь',
        'checked': true,
        'key': 901
      },
      {
        'name': 'Россия (Москва)',
        'checked': true,
        'key': 902
      },
      {
        'name': 'Россия (СПБ)',
        'checked': true,
        'key': 903
      },
      {
        'name': 'Россия (Смоленск)',
        'checked': true,
        'key': 904
      },
      {
        'name': 'Россия (Ростов-на-Дону)',
        'checked': true,
        'key': 905
      }
    ],
    'liquidity': true
  }    
   



  constructor(
    private priceComparisonsService: PriceComparisonsService,
    private currencyService: CurrencyService
    ) { 
      this.currencyService.carrencyChangeEmitter.subscribe(response => {
        this.getPriceComparisons()
      })
    }

  ngOnInit(): void {

    this.getPriceComparisons()

  }

  getPriceComparisons() {

    this.loadingBlock = true

    this.priceComparisonsService.getPriceComparisons(this.currencyService.getCurrency(), this.filter).subscribe(response => {
      
      this.allReports = response['result']
      this.cur = response['currency']

      if (this.allReports.length > 0) {
        this.reportPage = this.allReports.slice(0, 10)
      }

      this.length = response['result'].length
      this.loadingBlock = false


    })
  }

  paginatoreChange(event) {

    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex

    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length
    }
    this.reportPage = this.allReports.slice(startIndex, endIndex);
  }


}
