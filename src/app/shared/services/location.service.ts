import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private locationList = [
    { value: 'BY', name: 'Беларусь' },
    { value: 'RU_MO', name: 'Россия (Москва)' },
    { value: 'RU_SPB', name: 'Россия (СПБ)' },
    { value: 'RU_SMO', name: 'Россия (Смоленск)' },
    { value: 'RU_RND', name: 'Россия (Ростов-на-Дону)' }
  ]

  constructor() { }

  getLocationList() {
    return this.locationList
  }

  getLocation() {

    if (!this.validate(localStorage.getItem('location'))) {
      this.setLocationSelected('BY')
      return localStorage.getItem('location')
    }

    return localStorage.getItem('location')

  }

  setLocationSelected(location) {
    localStorage.setItem('location', location)
  }

  validate(location) {
    return ['BY', 'RU_MO', 'RU_SPB', 'RU_SMO'].indexOf(location) != -1 ? true : false
  }



}
