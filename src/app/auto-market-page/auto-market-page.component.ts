import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { PanelService } from '../user/shared/services/panel.service';
import { map } from 'rxjs/operators';
import { ChartService } from '../shared/services/chart.service';

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
  uniqId


  cur = this.currencyService.getCurrency()

  loadingMarks = true
  loadingModels = false
  loadingBtn = false
  loadingBlock = false

  form: FormGroup

  date = new Date();
  years = this.autoService.generateArrayOfYears()
  marks = undefined
  models = undefined
  modelsValue = undefined
  result



  constructor(
    private autoService: AutoService,
    private currencyService: CurrencyService,
    private locationService: LocationService,
    private panelService: PanelService,
    private chartService: ChartService
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


    if (this.form.invalid) {
      return;
    }
    this.loadingBtn = true
    this.loadingBlock = true

    this.autoService.getSearchMarket(this.form.value, this.currencyService.getCurrency(), this.locationService.getLocation()).pipe(
      map(response => {

        this.uniqId = response['uniqId'] // Important for uniqId
        return response

      })).subscribe(response => {

        this.result = response['data']
        this.cur = this.currencyService.getCurrency()

        this.loadingBtn = false
        this.loadingBlock = false
        this.chartService.resetChartsEmitter.emit();

        /*
        this.panelService.getUserReport(response['uniqId'], localStorage.getItem('accessToken'), this.currencyService.getCurrency()).subscribe(resolve => {

          console.log('resolve REPORT: ', resolve)
          this.report = resolve['report']
          this.cur = resolve['currency']

          if (!!resolve['report']['oldCars']) {
            this.showOldCars = true
          }
          this.loadingBtn = false
          this.loadingBlock = false

          this.chartService.resetChartsEmitter.emit();


        })*/


      })

  }





}
