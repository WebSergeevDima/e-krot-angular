import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { map } from 'rxjs/operators';
import { ChartService } from '../shared/services/chart.service';
import { NumbersService } from '../shared/services/numbers.service';

@Component({
  selector: 'app-auto-budget',
  templateUrl: './auto-budget.component.html',
  styleUrls: ['./auto-budget.component.scss']
})
export class AutoBudgetComponent implements OnInit {


  minYearValue: number = 1980;
  maxYearValue: number = (new Date()).getFullYear()
  optionsYear = {
    showTicks: true,
    step: 1,
    floor: 1980,
    ceil: (new Date()).getFullYear()
  };


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  listChipMarks = []

  cur = this.currencyService.getCurrency()
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
  marks = undefined
  result = []
  resultShow = false

  currencyList

  constructor(
    private autoService: AutoService,
    private currencyService: CurrencyService,
    private locationService: LocationService,
    private chartService: ChartService,
    private numbersService: NumbersService
  ) { }

  ngOnInit(): void {

    /*
    let inputsCur = document.querySelectorAll('[data-currency-price-input]')
    for (var i = 0; i < inputsCur.length; i++) {

      inputsCur[i].setAttribute('data-currency-price-input', this.cur)

    }*/

    this.currencyList = this.currencyService.getCurrencyList()

    this.autoService.getMarks().subscribe(response => {
      //console.log('Result', response)
      this.marks = response
      this.loadingMarks = false
    })

    //console.log(this.marks)
    this.form = new FormGroup({
      mark: new FormControl(null),
      budget: new FormControl('', Validators.required),
      currencyBudget: new FormControl(this.currencyBudget, Validators.required),
      bodyType: new FormControl(''),
      fuel: new FormControl(''),
      transmission: new FormControl('')

      /*
      mark: new FormControl('', Validators.required),
      bodyType: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      millage: new FormControl('', Validators.required),
      fuel: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required),
      transmission: new FormControl('', Validators.required)
      */

    })

  }


  removeListChipMarks(carId) {
    this.listChipMarks = this.listChipMarks.filter(mark => mark.id != carId)
  }
  addForListChipMarks(event) {
    let mark = this.marks.find(mark => mark.id === event.value)
    let markInListChipMarks = this.listChipMarks.find(mark => mark.id === event.value)

    if (mark && !markInListChipMarks && this.listChipMarks.length < 3) {
      this.listChipMarks.push(mark)
    }

  }

  thousandSeparator(event) {
    event.target.value = this.numbersService.thousandSeparator(event.target.value)
  }


  submit() {

    this.form.value['marks'] = this.listChipMarks
    this.form.value['minYear'] = this.minYearValue
    this.form.value['maxYear'] = this.maxYearValue


    if (this.form.invalid) {
      return;
    }

    this.loadingBtn = true
    this.loadingBlock = true

    this.autoService.getSearchBudget(this.form.value, this.currencyService.getCurrency(), this.locationService.getLocation()).pipe(
      map(response => {
        return response
      })).subscribe(response => {

        this.cur = response['currency']
        this.result = response['data']
        this.resultShow = true
        this.loadingBtn = false
        this.loadingBlock = false
        //this.cur = this.currencyService.getCurrency()
        /*
        this.chartService.resetChartsEmitter.emit();
        */

      })

  }


}
