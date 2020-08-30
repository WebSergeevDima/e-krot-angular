import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auto-price-page',
  templateUrl: './auto-price-page.component.html',
  styleUrls: ['./auto-price-page.component.scss']
})
export class AutoPricePageComponent implements OnInit {

  form: FormGroup

  marks = [
    { name: '1' },
    { name: '2' }
  ]
  models = [
    { name: '1' },
    { name: '2' }
  ]
  bodyTypes = [
    { name: '1' },
    { name: '2' }
  ]

  //marksControl = new FormControl('', Validators.required);
  //selectFormControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      mark: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      bodyType: new FormControl('', Validators.required)
    })

  }

  submit() {
    //console.log('Form:', this.form)
  }

}