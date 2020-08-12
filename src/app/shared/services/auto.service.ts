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

  generateArrayOfBodyTypes() {
    return [
      { value: 0, name: 'Внедорожник 3 дв.' },
      { value: 1, name: 'Внедорожник 5 дв.' },
      { value: 16, name: 'Кроссовер 3 дв.' },
      { value: 17, name: 'Кроссовер 5 дв.' },
      { value: 2, name: 'Кабриолет' },
      { value: 3, name: 'Купе' },
      { value: 4, name: 'Легковой фургон' },
      { value: 5, name: 'Лимузин' },
      { value: 6, name: 'Лифтбек' },
      { value: 7, name: 'Микроавтобус' },
      { value: 8, name: 'Минивэн' },
      { value: 9, name: 'Пикап' },
      { value: 10, name: 'Родстер' },
      { value: 11, name: 'Седан' },
      { value: 12, name: 'Универсал' },
      { value: 13, name: 'Хетчбэк 3 дв.' },
      { value: 14, name: 'Хетчбэк 5 дв.' },
      { value: 15, name: 'Другой' }
    ]
  }

  generateArrayOfFuel() {
    return [
      { value: 1, name: 'Бензин' },
      { value: 2, name: 'Дизель' },
      { value: 3, name: 'Электро' },
      { value: 4, name: 'Гибрид' }
    ]
  }
  generateArrayOfVolume() {
    return [
      { value: 6, name: '0,6' },
      { value: 7, name: '0,7' },
      { value: 8, name: '0,8' },
      { value: 9, name: '0,9' },
      { value: 10, name: '1,0' },
      { value: 11, name: '1,1' },
      { value: 12, name: '1,2' },
      { value: 13, name: '1,3' },
      { value: 14, name: '1,4' },
      { value: 15, name: '1,5' },
      { value: 16, name: '1,6' },
      { value: 17, name: '1,7' },
      { value: 18, name: '1,8' },
      { value: 19, name: '1,9' },
      { value: 20, name: '2,0' },
      { value: 21, name: '2,1' },
      { value: 22, name: '2,2' },
      { value: 23, name: '2,3' },
      { value: 24, name: '2,4' },
      { value: 25, name: '2,5' },
      { value: 26, name: '2,6' },
      { value: 27, name: '2,7' },
      { value: 28, name: '2,8' },
      { value: 29, name: '2,9' },
      { value: 30, name: '3,0' },
      { value: 31, name: '3,1' },
      { value: 32, name: '3,2' },
      { value: 33, name: '3,3' },
      { value: 34, name: '3,4' },
      { value: 35, name: '3,5' },
      { value: 36, name: '3,6' },
      { value: 37, name: '3,7' },
      { value: 38, name: '3,8' },
      { value: 39, name: '3,9' },
      { value: 40, name: '4,0' },
      { value: 41, name: '4,1' },
      { value: 42, name: '4,2' },
      { value: 43, name: '4,3' },
      { value: 44, name: '4,4' },
      { value: 45, name: '4,5' },
      { value: 46, name: '4,6' },
      { value: 47, name: '4,7' },
      { value: 48, name: '4,8' },
      { value: 49, name: '4,9' },
      { value: 50, name: '5,0' },
      { value: 51, name: '5,1' },
      { value: 52, name: '5,2' },
      { value: 53, name: '5,3' },
      { value: 54, name: '5,4' },
      { value: 55, name: '5,5' },
      { value: 56, name: '5,6' },
      { value: 57, name: '5,7' },
      { value: 58, name: '5,8' },
      { value: 59, name: '5,9' },
      { value: 60, name: '6,0' },
      { value: 61, name: '6,1' },
      { value: 62, name: '6,2' },
      { value: 63, name: '6,3' },
      { value: 64, name: '6,4' },
      { value: 65, name: '6,5' },
      { value: 66, name: '6,6' },
      { value: 67, name: '6,7' },
      { value: 68, name: '6,8' },
      { value: 69, name: '6,9' },
      { value: 70, name: '7,0' },
      { value: 71, name: '7,1' },
      { value: 72, name: '7,2' },
      { value: 73, name: '7,3' },
      { value: 74, name: '7,4' },
      { value: 75, name: '7,5' },
      { value: 76, name: '7,6' },
      { value: 77, name: '7,7' },
      { value: 78, name: '7,8' },
      { value: 79, name: '7,9' },
      { value: 80, name: '8,0' }
    ]
  }

  generateArrayOfTransmission() {
    return [
      { value: 'автомат', name: 'Автомат' },
      { value: 'механика', name: 'Механика' },
      { value: 'робот', name: 'Робот' }
    ]
  }

  generateArrayOfGear() {
    return [
      { value: 'передний', name: 'Передний' },
      { value: 'задний', name: 'Задний' },
      { value: 'подключаемый полный', name: 'Подключаемый полный' },
      { value: 'постоянный полный', name: 'Постоянный полный' }
    ]
  }

  generateArrayOfGenerationRestyling() {
    return [
      { value: 1, name: 'До рестайлинг' },
      { value: 2, name: 'Рестайлинг' },
      { value: 3, name: 'Предыдущее поколение' },
      { value: 4, name: 'Новое поколение' }
    ]
  }

  generateArrayOfEquipment() {
    return [
      { value: 1, name: 'Минимальная' },
      { value: 2, name: 'Средняя' },
      { value: 2, name: 'Максимальная' }
    ]
  }

  generateArrayOfShape() {
    return [
      { value: 1, name: 'Неудовлетворительное' },
      { value: 2, name: 'Хорошее' },
      { value: 3, name: 'Отличное' }
    ]
  }


  getMarks() {
    return this.http.get(`${BASE_URL}/auto/getMarks/`)
  }

  getModels(obj) {
    return this.http.post(`${BASE_URL}/auto/getModels/`, JSON.stringify(obj)).pipe(
      map(result => {
        return result['html']
      })
    )
  }

  getSearchMarket(obj, cur, location) {

    obj['currency'] = cur
    obj['location'] = location
    obj['accessToken'] = localStorage.getItem('accessToken')

    return this.http.post(`${BASE_URL}/auto/searchMarket/`, JSON.stringify(obj)).pipe(
      map(result => {
        console.log('r', result)
        return result
      })
    )
  }


  getSearchAuto(obj, cur, location, additionallyEquipment) {

    obj['currency'] = cur
    obj['location'] = location
    obj['accessToken'] = localStorage.getItem('accessToken')
    obj['additionallyEquipment'] = additionallyEquipment

    return this.http.post(`${BASE_URL}/auto/searchAuto/`, JSON.stringify(obj)).pipe(
      map(result => {
        console.log('r', result)
        return result
      })
    )
  }

}
