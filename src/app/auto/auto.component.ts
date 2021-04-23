import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutoService } from '../shared/services/auto.service';
import { CurrencyService } from '../shared/services/currency.service';
import { LocationService } from '../shared/services/location.service';
import { map } from 'rxjs/operators';
import { NumbersService } from '../shared/services/numbers.service';
import { PanelService } from '../user/shared/services/panel.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

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
  loadingBodyTypes = false

  form: FormGroup

  date = new Date();
  years = this.autoService.generateArrayOfYears()
  //bodyTypeArr = this.autoService.generateArrayOfBodyTypes()
  bodyTypeArr: any
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
  bodyTypes = undefined
  bodyTypesValue = undefined
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
    private numbersService: NumbersService,
    private panelService: PanelService,
    public dialog: MatDialog
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
      this.bodyTypeArr = []
      this.models = response
      this.loadingModels = false
    })


  }

  
  getBodyTypes(value, selectBodyTypes) {

    let modelId = value
    

    this.bodyTypesValue = undefined
    this.bodyTypes = null

    if (!modelId) {
      return false
    }

    this.loadingBodyTypes = true
    
    this.autoService.getBodyTypes(modelId, this.locationService.getLocation()).subscribe(response => {
      this.bodyTypeArr = response
      this.loadingBodyTypes = false
    })


  }

  submit() {


   // console.log('this.form.value: ', this.form.value)
    //return
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

        if (Object.keys(this.result).length < 1) {

          this.result = false

        } else {

          this.cur = this.currencyService.getCurrency()
          //this.chartService.resetChartsEmitter.emit();
          this.panelService.updateReportEmitter.emit({ uniqId: this.uniqId });

        }        
        
        this.loadingBtn = false
        this.loadingBlock = false
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

  showInfoEquipment() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Поколение/Рестайлинг',
        content: 'Параметр следует заполнить, если автомобиль был выпущен в год, когда выпускались оба варианта кузова (рестайлинг/дорестайлинг или новое/предыдущее поколение)',
        btnClose: 'Закрыть',
        btnClosePosition: 'center',
        styles: 'dialog_blue'
      }
    })
  }


}
