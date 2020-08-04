import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(
    private http: HttpClient
  ) { }



  userReport(obj) {
    return this.http.post(`${BASE_URL}/chart/user-report/`, JSON.stringify(obj)).pipe(
      map(response => {
        return response['chart']
      })
    )
  }


}