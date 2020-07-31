import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencyList = []
  currencySelected = localStorage.getItem('currency')

  constructor(
    private currency: CurrencyService
  ) { }

  ngOnInit(): void {
    this.currencyList = this.currency.getCurrencyList()
    this.currencySelected = this.currency.getCurrency()
  }

  currencyChange() {
    this.currency.setCurrencySelected(this.currencySelected)
  }

}
