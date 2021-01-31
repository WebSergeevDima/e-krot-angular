import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class MarketStatisticsService {

  constructor(
    private http: HttpClient
  ) { }

  allStatistics(currency) {
    return this.http.post(`${BASE_URL}/market_statistics/all_statistics/`, JSON.stringify({currency: currency}))
  }
}
