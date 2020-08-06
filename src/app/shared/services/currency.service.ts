import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';

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

  constructor(
    private http: HttpClient
  ) { }

  getCurrencyList() {
    return this.currencyList
  }

  getCurrency() {

    if (!this.validate(localStorage.getItem('currency'))) {
      this.setCurrencySelected('USD')
      return localStorage.getItem('currency')
    }

    return localStorage.getItem('currency')

  }

  setCurrencySelected(currency) {
    localStorage.setItem('currency', currency)
  }

  validate(currency) {
    return ['USD', 'RUB', 'EUR', 'BYN', 'UAH'].indexOf(currency) != -1 ? true : false
  }

  converterPrice(obj) {
    return this.http.post(`${BASE_URL}/currency/converter-price/`, JSON.stringify(obj))
  }



}
