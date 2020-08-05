import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  public cur
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


  public changeTypePriceMarkYears(): void {
    this.chartPriceMarkYearsType = this.chartPriceMarkYearsType === 'bar' ? 'line' : 'bar';
  }










  constructor(
    private activatedRoute: ActivatedRoute,
    private chartService: ChartService
  ) {

  }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {

      const obj = {
        accessToken: localStorage.getItem('accessToken'),
        currency: localStorage.getItem('currency'),
        uniqId: params.get('uniqId')
      }

      this.chartService.userReport(obj).subscribe(response => {
        console.log(response)

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

    })



    /*
  
    this.activatedRoute.paramMap.subscribe(params => {
  
      console.log('uniqId2222:', params.get('uniqId'));
  
      const obj = {
        accessToken: localStorage.getItem('accessToken'),
        currency: localStorage.getItem('currency'),
        uniqId: params.get('uniqId')
      }
  
      this.chartService.userReport(obj).subscribe(response => {
        console.log('chart: ', response)
  
        for (let item of response['chart']) {
          console.log('item', item)
        }
        this.data = response['chart']
      })
  
    })*/

  }



  dataUpdate() {

    this.chartPriceMarkYearsData = [
      { data: [55, 55, 60, 70, 46, 33], label: 'Best Fruits' }
    ];

  }

}
