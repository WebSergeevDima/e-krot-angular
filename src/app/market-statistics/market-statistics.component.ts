import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../shared/services/currency.service';
import { MarketStatisticsService } from '../shared/services/market-statistics.service';

@Component({
  selector: 'app-market-statistics',
  templateUrl: './market-statistics.component.html',
  styleUrls: ['./market-statistics.component.scss']
})
export class MarketStatisticsComponent implements OnInit {

  public cur

  public chartMSTopLabels = []
  public chartMSTopType = 'pie'
  public chartMSTopData = [
    { data: [], label: ''}
  ]
  public chartMSTopColors: Array<any> = [
    {
      backgroundColor: [],
    }];
public chartMSTopOptions = {
  responsive: true,
  legend: {
    display: true,
    position: 'left',
    labels: {
      fontColor: 'black',
      //fontFamily: 'Calibri Light',
      //fontStyle: 'italic'
    }
  },
  /*
  scales: {
      yAxes: [{
          ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                console.log('values: ', values)
                  return '% ' + value;
              }
          }
      }]
  },*/
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var currentValue = dataset.data[tooltipItem.index]
        var titleValue = data.labels[tooltipItem.index]
        return titleValue + ': ' + currentValue + " %"
      }
    }
  }
}

  public chartMSCountLabels = []
  public chartMSCountType = 'line'
  public chartMSCountData = [
    { data: [], label: '' }
  ]
  public chartMSCountColors: Array<any> = [
    {
      backgroundColor: 'rgb(22 219 147 / 70%)',
    }];

  public chartMSCountOptions = {
    responsive: true,
    legend: {
      display: false,
      //position: 'top'
    },  
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index]
          return  currentValue + " шт"
        }
      }
    }
  }

  public chartMSPriceAvgLabels = []
  public chartMSPriceAvgType = 'line'
  public chartMSPriceAvgData = [
    { data: [], label: ''} 
  ]

  public chartMSPriceAvgOptions = {
    responsive: true,
    legend: {
      display: false,
      //position: 'top'
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {    
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index]
          return  currentValue
        }
      }
    }
  }
  public chartMSPriceAvgColors: Array<any> = [
    {
      backgroundColor: 'rgb(22 219 147 / 70%)',
    }];  

  constructor(
    private marketStatistics: MarketStatisticsService,
    private currencyService: CurrencyService,
    ) { 
      this.currencyService.carrencyChangeEmitter.subscribe(response => {
        this.showChartMarketStatistics()
      })
    }

  ngOnInit(): void {   

    window.addEventListener('resize', event => {
 
     this.legendDisplay();

    }, false);

    this.showChartMarketStatistics()
  }

  legendDisplay() {
    if(document.documentElement.clientWidth <= 600) {
      this.chartMSTopType = 'bar'
      this.chartMSTopOptions['legend']['display'] = false
    } else {
      this.chartMSTopType = 'pie'
      this.chartMSTopOptions['legend']['display'] = true
    }
    this.showChartMarketStatistics()
  }


  showChartMarketStatistics() {
    
    this.marketStatistics.allStatistics(this.currencyService.getCurrency()).subscribe(response => {

      const colorsArr = ["#54478c","#2c699a","#048ba8","#0db39e","#16db93","#83e377","#b9e769","#efea5a","#f1c453","#f29e4c","#ffc09f","#ffee93","#fcf5c7","#a0ced9","#adf7b6"]

      this.cur = this.currencyService.getCurrency()

      this.clearChartMarketStatistics()

      let rating = response['result'][0]['MS_RATING_MARK']
      let otherPercent = 0;
      for (let i = 0; i < rating.length; i++) {
        otherPercent += rating[i]['percent']
        this.chartMSTopLabels.push(rating[i]['markTitle'])
        this.chartMSTopData[0]['data'].push(rating[i]['percent'])
        this.chartMSTopColors[0]['backgroundColor'].push(colorsArr[i])         
      }
      this.chartMSTopLabels.push('Остальные марки')
      this.chartMSTopData[0]['data'].push((100 - otherPercent))

      for (let i = 0; i < response['result'].length; i++) { 
        this.chartMSCountLabels.push(response['result'][i]['MS_DATE_CREATE'])
        this.chartMSCountData[0]['data'].push(response['result'][i]['MS_CARS_COUNT'])        
        this.chartMSPriceAvgLabels.push(response['result'][i]['MS_DATE_CREATE'])
        this.chartMSPriceAvgData[0]['data'].push(response['result'][i]['MS_CARS_PRICE_AVG'])        
      }

    })



  }

  clearChartMarketStatistics():void {

    this.chartMSTopLabels = []
    this.chartMSTopData[0]['data'] = []
    this.chartMSTopColors[0]['backgroundColor'] = []      
    this.chartMSCountLabels = []
    this.chartMSCountData[0]['data'] = []
    this.chartMSPriceAvgLabels = []
    this.chartMSPriceAvgData[0]['data'] = []    

  }


}
