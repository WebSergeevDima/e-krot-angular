import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/api-config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( 
    private http: HttpClient
    ) { }


  saveReportPdf(uniqId: string, currency) {

    const myHeaders = new HttpHeaders({
      //'Content-Disposition': 'attachment',
      'Content-Type': 'application/json', 
      'Accept': 'application/pdf'
    });


    return this.http.post(`${BASE_URL}/report/save_report_pdf/`, JSON.stringify({ uniqId: uniqId, accessToken: localStorage.getItem('accessToken') ?? '', currency: currency }), /*, { headers: myHeaders }*/)

  }


}
