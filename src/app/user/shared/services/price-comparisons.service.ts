import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriceComparisonsService {

  constructor(private http: HttpClient) { }

  getPriceComparisons(currency, filter) {
    return this.http.post(`${BASE_URL}/price_comparisons/all_price_comparisons/`, JSON.stringify({accessToken: localStorage.getItem('accessToken') ?? '', currency: currency, filter: filter}))
  }
  
}
