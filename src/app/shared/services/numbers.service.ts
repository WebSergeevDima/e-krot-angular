import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {

  constructor() { }



  thousandSeparator(str) {

    str = str.replace(/\s/g, '');

    let parts = (str + '').split('.'),
      main = parts[0],
      len = main.length,
      output = '',
      i = len - 1;

    while (i >= 0) {
      output = main.charAt(i) + output
      if ((len - i) % 3 === 0 && i > 0) {
        output = ' ' + output
      }
      --i;
    }

    if (parts.length > 1) {
      output += '.' + parts[1]
    }
    return output

  }

}
