import { Injectable, EventEmitter } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  //public resetChartsEmitter = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  userReport(obj) {
    return this.http.post(`${BASE_URL}/chart/all_charts/`, JSON.stringify(obj))
  }


}