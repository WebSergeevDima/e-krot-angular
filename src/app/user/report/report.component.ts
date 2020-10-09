import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../shared/services/panel.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { map } from 'rxjs/operators';
import { ChartService } from 'src/app/shared/services/chart.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() uniqId: string
  @Input() showOldCars: boolean = false
  report = {
    tradeIn: {},
    oldCars: []
  }
  @Input() cur
  //public uniqId

  public chartPriceHistoryShow = false

  chartPriceHistoryData = [
    { data: [], label: 'Средняя стоимость' },
  ];

  chartPriceHistoryLabels = [];
  chartPriceHistoryOptions = {
    responsive: true,
  };
  chartPriceHistoryColors = [
    {
      //backgroundColor:[],
      //borderColor: 'rgba(255, 87, 34, 0.6)',
      backgroundColor: 'rgba(66, 165, 245, 0.7)',
    },
  ];
  chartPriceHistoryLegend = false;
  chartPriceHistoryPlugins = [];
  chartPriceHistoryType = 'line';

  public changeTypePriceHistory(): void {
    this.chartPriceHistoryType = this.chartPriceHistoryType === 'bar' ? 'line' : 'bar';
  }

  public chartPriceMarkYearsOptions = {
    responsive: true,
  }
  public chartPriceMarkYearsLabels = [];
  public chartPriceMarkYearsType = 'bar';
  public chartPriceMarkYearsLegend = false;
  public chartPriceMarkYearsPlugins = [];
  public chartPriceMarkYearsData = [
    { data: [], label: 'Средняя стоимость' }
  ]

  public chartColors: Array<any> = [
    {
      //backgroundColor: 'rgba(66, 165, 245, 0.5)',
      backgroundColor: [],
      //borderColor: '#000000',
      //pointBackgroundColor: 'rgba(225,10,24,0.8)',
      //pointBorderColor: '#fff',
      //pointHoverBackgroundColor: '#fff',
      //pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  constructor(
    private activatedRoute: ActivatedRoute,
    private panelService: PanelService,
    public currencyService: CurrencyService,
    private chartService: ChartService
  ) {

    this.currencyService.carrencyChangeEmitter.subscribe(response => {
      this.showCharts()
    })

    /*
    this.chartService.resetChartsEmitter.subscribe(response => {
      this.showReport()
    })
    */
    this.panelService.updateReportEmitter.subscribe(response => {
      this.uniqId = response['uniqId']
      this.showReport()
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(response => {
      this.showReport()
    })
  }

  showReport() {

    this.panelService.getUserReport(this.uniqId, this.currencyService.getCurrency()).subscribe(resolve => {
      this.report = resolve['report']
      this.cur = resolve['currency']

      if (!!resolve['report']['oldCars']) {
        this.showOldCars = true
      }
      this.showCharts()
    })

  }


  public changeTypePriceMarkYears(): void {
    this.chartPriceMarkYearsType = this.chartPriceMarkYearsType === 'bar' ? 'line' : 'bar';
  }

  showCharts() {

    const obj = {
      accessToken: localStorage.getItem('accessToken'),
      currency: localStorage.getItem('currency'),
      uniqId: this.uniqId
      //uniqId: 'bYJm7xOTvrRggdjtOQiSsBOW' //for test
    }

    this.chartService.userReport(obj).subscribe(response => {

      this.clearCharts()
      this.cur = response['currency']

      for (let car of response['chartPriceMarkYears']) {
        this.chartPriceMarkYearsLabels.push(car['year'])
        this.chartPriceMarkYearsData[0]['data'].push(car['priceAvg'])
        if (car['userYear']) {
          this.chartColors[0]['backgroundColor'].push('rgba(66, 165, 245, 0.7)')
        } else {
          this.chartColors[0]['backgroundColor'].push('rgba(255, 87, 34, 0.6)')
        }
      }

      for (let month of response['chartPriceHistory']['month']) {
        this.chartPriceHistoryLabels.push(month)
      }
      for (let priceAvg of response['chartPriceHistory']['priceAvg']) {
        this.chartPriceHistoryData[0]['data'].push(priceAvg)
      }

      if (response['chartPriceHistory']['month'].length > 1) {
        this.chartPriceHistoryShow = true
      }

    })

  }

  clearCharts() {
    this.chartPriceMarkYearsOptions = {
      responsive: true,
    }
    this.chartPriceMarkYearsLabels = [];
    this.chartPriceMarkYearsType = 'bar';
    this.chartPriceMarkYearsLegend = false;
    this.chartPriceMarkYearsPlugins = [];
    this.chartPriceMarkYearsData = [
      { data: [], label: 'Средняя стоимость' }
    ]
    this.chartColors[0]['backgroundColor'] = []

    this.chartPriceHistoryData = [
      { data: [], label: 'Средняя стоимость' },
    ];

    this.chartPriceHistoryLabels = [];
    this.chartPriceHistoryOptions = {
      responsive: true,
    };
    this.chartPriceHistoryColors = [
      {
        //backgroundColor:[],
        //borderColor: 'rgba(255, 87, 34, 0.6)',
        backgroundColor: 'rgba(66, 165, 245, 0.7)',
      },
    ];
    this.chartPriceHistoryLegend = false;
    this.chartPriceHistoryPlugins = [];
    this.chartPriceHistoryType = 'line';
  }

  doSomething() {

  }

  dataUpdate() {

    this.chartPriceMarkYearsData = [
      { data: [55, 55, 60, 70, 46, 33], label: 'Best Fruits' }
    ];

  }

}
