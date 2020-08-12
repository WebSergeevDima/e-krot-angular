import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { map } from 'rxjs/operators';
import { ChartService } from '../shared/services/chart.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoComponent implements OnInit {


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
  bodyTypeArr = this.autoService.generateArrayOfBodyTypes()
  fuelArr = this.autoService.generateArrayOfFuel()
  volumeArr = this.autoService.generateArrayOfVolume()
  transmissionArr = this.autoService.generateArrayOfTransmission()
  gearArr = this.autoService.generateArrayOfGear()
  generationRestylingArr = this.autoService.generateArrayOfGenerationRestyling()
  equipmentArr = this.autoService.generateArrayOfEquipment()
  shapeArr = this.autoService.generateArrayOfShape()
  marks = undefined
  models = undefined
  modelsValue = undefined
  result

  additionallyEquipment = [
    {
      price: 0,
      currency: 'USD',
      year: 2020
    }
  ]
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
      model: new FormControl('', Validators.required),
      bodyType: new FormControl(),
      year: new FormControl('', Validators.required),
      millage: new FormControl(null),
      fuel: new FormControl(null),
      volume: new FormControl(null),
      transmission: new FormControl(null),
      gear: new FormControl(null),
      generationRestyling: new FormControl(null),
      equipment: new FormControl(null),
      shape: new FormControl(null)

      /*
      mark: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      bodyType: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      millage: new FormControl('', Validators.required),
      fuel: new FormControl('', Validators.required),
      volume: new FormControl('', Validators.required),
      transmission: new FormControl('', Validators.required),
      gear: new FormControl('', Validators.required),
      generationRestyling: new FormControl('', Validators.required),
      equipment: new FormControl('', Validators.required),
      shape: new FormControl('', Validators.required)
      */

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


    console.log('this.form.value: ', this.form.value)
    console.log('additionallyEquipment: ', this.additionallyEquipment)

    if (this.form.invalid) {
      return;
    }


    //this.loadingBtn = true
    //this.loadingBlock = true

    this.autoService.getSearchAuto(this.form.value, this.currencyService.getCurrency(), this.locationService.getLocation(), this.additionallyEquipment).pipe(
      map(response => {

        this.uniqId = response['uniqId'] // Important for uniqId
        return response

      })).subscribe(response => {

        this.result = response['data']
        this.cur = this.currencyService.getCurrency()

        this.loadingBtn = false
        this.loadingBlock = false
        this.chartService.resetChartsEmitter.emit();

      })

  }


  deleteAdditionallyEquipment(id) {
    this.additionallyEquipment.splice(id, 1)
  }

  addAdditionallyEquipment() {
    console.log(' this.additionallyEquipment add: ', this.additionallyEquipment)
    this.additionallyEquipment.push({
      price: null,
      currency: 'USD',
      year: 2020
    })
  }


  changePriceadditionallyEquipment(event, id) {
    event.path[1].querySelector('input').value = parseInt(event.target.value.replace(/^0+/, '').replace(/\D+/g, ''))
    this.additionallyEquipment[id].price = parseInt(event.target.value.replace(/^0+/, '').replace(/\D+/g, ''))
  }

}
