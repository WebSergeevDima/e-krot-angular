import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/api-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public allReports

  constructor(private http: HttpClient) { }

  getUserAllReports(accessToken: string) {

    return this.http.post(`${BASE_URL}/panel/userAllReports/`, JSON.stringify({ accessToken: accessToken })).pipe(
      map(resolve => {
        console.log('test rep', resolve)
        return resolve
      }
      )
    )
  }

  getUserReport(uniqId: string, accessToken: string) {

    return this.http.post(`${BASE_URL}/panel/user_report/`, JSON.stringify({ uniqId: uniqId, accessToken: accessToken })).pipe(
      map(resolve => {
        console.log('test uniqId', resolve)
        return resolve
      }
      )
    )

  }

}
