import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
    return this.http.get('http://e-krot/api/web/auto/getMarks/')
  }

  getModels(obj) {
    return this.http.post('http://e-krot/api/web/auto/getModels/', JSON.stringify(obj)).pipe(
      map(result => {    
        return result['html']
      })
    )
  }

  getSearchMarket(obj) {
    return this.http.post('http://e-krot/api/web/auto/searchMarket/', JSON.stringify(obj)).pipe(
      map(result => {   
        console.log('r', result) 
        return result
      })
    )
  }

}
