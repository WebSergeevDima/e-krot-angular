import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencyList = [{name: 'jj'},{name: 'jj2'},{name: 'jj3'}]
  currencySelected = localStorage.getItem('currency')
  appTitle: string = 'Welcome';
  appList: any[] = [ {
     "ID": "1",
     "Name" : "One"
  },

  {
     "ID": "2",
     "Name" : "Two"
  } ];

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
   // console.log('debug', this.currencyService.getCurrencyList())
    //this.currencyList = this.currencyService.getCurrencyList()
    //this.currencySelected = this.currencyService.getCurrency()
  }

  currencyChange() {
    this.currencyService.setCurrencySelected(this.currencySelected)
  }

}
