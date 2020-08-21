import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  onGetDataInCur = 111





  @Output() customName = new EventEmitter()

  currencyList: any[]
  currencySelected = localStorage.getItem('currency')

  constructor(
    private currencyService: CurrencyService
  ) {



  }

  ngOnInit(): void {
    console.log('debug', this.currencyService.getCurrencyList())
    this.currencyList = this.currencyService.getCurrencyList()
    this.currencySelected = this.currencyService.getCurrency()
  }

  currencyChange() {

    this.customName.emit('Hi iz componenta Currency)')

    this.currencyService.setCurrencySelected(this.currencySelected)
    let allCurrencyPrice = document.querySelectorAll('[data-currency-price]')
    //let allCurrencyPriceInput: any = document.querySelectorAll('[data-currency-price-input]')

    const arrPrices = []
    for (var i = 0; i < allCurrencyPrice.length; i++) {

      let price = parseInt(allCurrencyPrice[i].getAttribute('data-currency-price').replace(/\D+/g, ""))
      arrPrices.push(price)

    }

    /*
    const arrPricesInput = []
    const arrPricesInputCur = []
    for (var i = 0; i < allCurrencyPriceInput.length; i++) {

      let price = parseInt(allCurrencyPriceInput[i].value.replace(/\D+/g, ""))
      let cur = allCurrencyPriceInput[i].getAttribute('data-currency-price-input')
      arrPricesInput.push(price)
      arrPricesInputCur.push(cur)

    }
*/

    this.currencyService.converterPrice({
      prices: arrPrices,
      //pricesInput: arrPricesInput,
      //pricesInputCur: arrPricesInputCur,
      currency: this.currencyService.getCurrency()
    }).subscribe(response => {
      //console.log('coverter: ', response)

      for (var i = 0; i < allCurrencyPrice.length; i++) {

        allCurrencyPrice[i].innerHTML = response['prices'][i]

      }
      /*
            for (var i = 0; i < allCurrencyPriceInput.length; i++) {
      
              allCurrencyPriceInput[i].value = response['pricesInput'][i]
      
            }
      */

      let allCurrencyUnit = document.querySelectorAll('[data-currency-unit]')

      for (var i = 0; i < allCurrencyUnit.length; i++) {

        allCurrencyUnit[i].setAttribute('data-currency-unit', response['currency'])

      }



      this.currencyService.carrencyChangeEmitter.emit(this.currencyService.getCurrency());
    })


  }



}
