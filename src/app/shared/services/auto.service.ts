import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/app/api-config';



@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(
    private http: HttpClient
  ) { }

  generateArrayOfYears() {
    const years = []
    for (var i = new Date().getFullYear(); i >= 1980; i--) {
      years.push(i)
    }
    return years
  }

  getMarks() {
    return this.http.get(`${BASE_URL}/auto/getMarks/`)
    /*
    .pipe(
      map(r => {
        console.log(r)
      })
    )
    */
    /*
    .pipe(
      map((result: []) => {
        return result.map(result => {
          return {
            id: result['id'],
            title: result['title']
          }
        })
      })
    )
    */
  }

  getModels(obj) {
    return this.http.post(`${BASE_URL}/auto/getModels/`, JSON.stringify(obj)).pipe(
      map(result => {
        return result['html']
      })
    )
  }

  getSearchMarket(obj) {
    return this.http.post(`${BASE_URL}/auto/searchMarket/`, JSON.stringify(obj)).pipe(
      map(result => {
        console.log('r', result)
        return result
      })
    )
  }

}
