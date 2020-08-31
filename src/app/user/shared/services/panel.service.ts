import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public updateReportEmitter = new EventEmitter();
  public allReports

  constructor(private http: HttpClient) { }

  getUserAllReports(accessToken: string, currency) {

    return this.http.post(`${BASE_URL}/panel/user_all_reports/`, JSON.stringify({ accessToken: accessToken, currency: currency }))
  }

  getUserReport(uniqId: string, currency) {

    return this.http.post(`${BASE_URL}/panel/user_report/`, JSON.stringify({ uniqId: uniqId, accessToken: localStorage.getItem('accessToken') ?? '', currency: currency }))

  }

}
