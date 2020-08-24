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
    private chartService: ChartService,
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
        console.log('responseresponse response: ', response)
        this.uniqId = response['uniqId'] // Important for uniqId
        return response

      })).subscribe(response => {
        this.result = response['data']
        this.cur = this.currencyService.getCurrency()
        this.loadingBtn = false
        this.loadingBlock = false
        this.resultShow = true
        //this.chartService.resetChartsEmitter.emit();
        this.panelService.updateReportEmitter.emit({ uniqId: this.uniqId });
      })

  }





}
