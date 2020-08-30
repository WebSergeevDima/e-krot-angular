import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { map } from 'rxjs/operators';
import { ChartService } from '../shared/services/chart.service';
import { NumbersService } from '../shared/services/numbers.service';
import { PanelService } from '../user/shared/services/panel.service';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
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
  resultShow = false

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
    private chartService: ChartService,
    private numbersService: NumbersService,
    private panelService: PanelService
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

      /* 
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
 */

      mark: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      bodyType: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      millage: new FormControl(null, Validators.required),
      fuel: new FormControl(null, Validators.required),
      volume: new FormControl(null, Validators.required),
      transmission: new FormControl(null, Validators.required),
      gear: new FormControl(null, Validators.required),
      generationRestyling: new FormControl(null),
      equipment: new FormControl(null),
      shape: new FormControl(null)


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

  submit() {


    //console.log('this.form.value: ', this.form.value)
    //console.log('additionallyEquipment: ', this.additionallyEquipment)

    if (this.form.invalid) {
      return;
    }


    this.loadingBtn = true
    this.loadingBlock = true

    this.autoService.getSearchAuto(this.form.value, this.currencyService.getCurrency(), this.locationService.getLocation(), this.additionallyEquipment).pipe(
      map(response => {
        //console.log('response AUTO SEARCH in map:', response)
        this.uniqId = response['uniqId'] // Important for uniqId
        return response

      })).subscribe(response => {

        this.result = response['data']
        this.cur = this.currencyService.getCurrency()
        this.loadingBtn = false
        this.loadingBlock = false
        this.panelService.updateReportEmitter.emit({ uniqId: this.uniqId });
        this.resultShow = true

      })

  }


  deleteAdditionallyEquipment(id) {
    this.additionallyEquipment.splice(id, 1)
  }

  addAdditionallyEquipment() {    
    this.additionallyEquipment.push({
      price: null,
      currency: 'USD',
      year: 2020
    })
  }


  changePriceadditionallyEquipment(event, id) {
    event.path[1].querySelector('input').value = this.numbersService.thousandSeparator(event.target.value)
    this.additionallyEquipment[id].price = parseInt(event.target.value.replace(/^0+/, '').replace(/\D+/g, ''))
  }

  thousandSeparator(event) {
    event.target.value = this.numbersService.thousandSeparator(event.target.value)
  }


}
