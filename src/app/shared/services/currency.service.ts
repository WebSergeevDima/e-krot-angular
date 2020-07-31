import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currencyList = [
    { value: 'USD', name: 'USD' },
    { value: 'RUB', name: 'RUB' },
    { value: 'EUR', name: 'EUR' },
    { value: 'BYN', name: 'BYN' },
    { value: 'UAH', name: 'UAH' }
  ]

  constructor() { }

  getCurrencyList() {
    return this.currencyList
  }

  setCurrencySelected(currency) {
    localStorage.setItem('currency', currency)
  }

  validate(currency) {
    return ['USD', 'RUB', 'EUR', 'BYN', 'UAH'].indexOf(currency) != -1 ? true : false
  }

}
