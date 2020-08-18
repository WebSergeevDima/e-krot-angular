import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { map } from 'rxjs/operators';
import { ChartService } from '../shared/services/chart.service';

@Component({
  selector: 'app-auto-budget',
  templateUrl: './auto-budget.component.html',
  styleUrls: ['./auto-budget.component.scss']
})
export class AutoBudgetComponent implements OnInit {


  minValue: number = 50;
  maxValue: number = 200;
  options = {
    floor: 0,
    ceil: 250
  };





  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;











  public report = {
    tradeIn: {},
    oldCars: []
  }
  uniqId

  currencyBudget = this.currencyService.getCurrency()

  loadingMarks = true
  loadingBtn = false
  loadingBlock = false

  form: FormGroup

  date = new Date();
  years = this.autoService.generateArrayOfYears()
  bodyTypeArr = this.autoService.generateArrayOfBodyTypes()
  fuelArr = this.autoService.generateArrayOfFuel()
  transmissionArr = this.autoService.generateArrayOfTransmission()
  gearArr = this.autoService.generateArrayOfGear()
  marks = undefined
  result

  currencyList

  constructor(
    private autoService: AutoService,
    private currencyService: CurrencyService,
    private locationService: LocationService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {

    this.currencyList = this.currencyService.getCurrencyList()

    this.autoService.getMarks().subscribe(response => {
      //console.log('Result', response)
      this.marks = response
      this.loadingMarks = false
    })

    //console.log(this.marks)
    this.form = new FormGroup({
      mark: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
      currencyBudget: new FormControl(this.currencyBudget, Validators.required),
      bodyType: new FormControl(),
      year: new FormControl(null),
      fuel: new FormControl(null),
      transmission: new FormControl(null),
      gear: new FormControl(null)

      /*
      mark: new FormControl('', Validators.required),
      bodyType: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      millage: new FormControl('', Validators.required),
      fuel: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required),
      transmission: new FormControl('', Validators.required),
      gear: new FormControl('', Validators.required)
      */

    })

  }



  submit() {




    console.log('this.form.value: ', this.form.value)


    /*
    if (this.form.invalid) {
      return;
    }


    //this.loadingBtn = true
    //this.loadingBlock = true

    this.autoService.getSearchBudget(this.form.value, this.currencyService.getCurrency(), this.locationService.getLocation()).pipe(
      map(response => {
        console.log('userID for report auto: ', response['uniqId'])
        this.uniqId = response['uniqId'] // Important for uniqId
        return response

      })).subscribe(response => {

        this.result = response['data']
        this.cur = this.currencyService.getCurrency()

        this.loadingBtn = false
        this.loadingBlock = false
        this.chartService.resetChartsEmitter.emit();

      })
*/
  }


}
