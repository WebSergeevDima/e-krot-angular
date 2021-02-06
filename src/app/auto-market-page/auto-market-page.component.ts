import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { map } from 'rxjs/operators';
import { ChartService } from '../shared/services/chart.service';
import { PanelService } from '../user/shared/services/panel.service';

@Component({
  selector: 'app-auto-market-page',
  templateUrl: './auto-market-page.component.html',
  styleUrls: ['./auto-market-page.component.scss']
})
export class AutoMarketPageComponent implements OnInit {

  public report = {
    tradeIn: {},
    oldCars: []
  }
  showOldCars: boolean = false
  public uniqId

  cur = this.currencyService.getCurrency()

  loadingMarks = true
  loadingModels = false
  loadingBtn = false
  loadingBlock = false
  resultShow = false
  loadingModelYears = false

  form: FormGroup

  date = new Date();
  //years = this.autoService.generateArrayOfYears()
  years: any
  marks = undefined
  models = undefined
  modelsValue = undefined
  modelYears = undefined
  modelYearsValue = undefined
  result

  constructor(
    private autoService: AutoService,
    private currencyService: CurrencyService,
    private locationService: LocationService,
    private panelService: PanelService
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



  getYears(value, selectBodyTypes) {

    let modelId = value   

    this.modelYearsValue = undefined
    this.modelYears = null

    if (!modelId) {
      return false
    }

    this.loadingModelYears = true

    this.autoService.getModelYears(modelId).subscribe(response => {
      this.years = response
      this.loadingModelYears = false
    })


  }



  submit() {
    if (this.form.invalid) {
      return;
    }
    this.loadingBtn = true
    this.loadingBlock = true

    //this.panelService.reportBtnEmitter.emit();

    this.autoService.getSearchMarket(this.form.value, this.currencyService.getCurrency(), this.locationService.getLocation()).pipe(
      map(response => {
        this.uniqId = response['uniqId'] // Important for uniqId
        return response

      })).subscribe(response => {

        this.result = response['data']

        if (Object.keys(this.result).length < 1) {

          this.result = false

        } else {

          this.cur = this.currencyService.getCurrency()
          this.panelService.updateReportEmitter.emit({ uniqId: this.uniqId });

        }

        this.loadingBtn = false
        this.loadingBlock = false
        this.resultShow = true


      })

  }





}
