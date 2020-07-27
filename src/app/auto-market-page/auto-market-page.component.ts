import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';

@Component({
  selector: 'app-auto-market-page',
  templateUrl: './auto-market-page.component.html',
  styleUrls: ['./auto-market-page.component.scss']
})
export class AutoMarketPageComponent implements OnInit {

  loadingMarks = true
  loadingModels = false
  loadingBtn = false

  form: FormGroup

  years = this.autoService.generateArrayOfYears()
  marks = undefined
  models = undefined
  modelsValue = undefined
  result
  oldCars

  constructor(
    private autoService: AutoService
  ) { }

  ngOnInit(): void {
    

    this.autoService.getMarks().subscribe(response => {
      //console.log('Result', response)
      this.marks = response
      this.loadingMarks = false
    })

    //console.log(this.marks)
    this.form = new FormGroup({
      mark: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required)
    })



  }


  getModels(value, selectModels) {
    
    console.log('selectModels', selectModels)
    const markId = {
      id: value
    }

    this.modelsValue = undefined
    this.models = null

    if (!markId['id']) {
      return false
    }

    this.loadingModels = true

    this.autoService.getModels(markId).subscribe(response => {
      this.models = response
      this.loadingModels = false
    })


  }

  submit() {
   // const formControls = this.form.controls

    if (this.form.invalid) {
      return;
    }
    this.loadingBtn = true
   

    this.autoService.getSearchMarket(this.form.value).subscribe(response => {
      this.result = response['data']
      this.oldCars = response['data']['oldCars']
      this.loadingBtn = false    
    })

  }





}
