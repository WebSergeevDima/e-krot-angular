import { Component, OnInit } from '@angular/core';
import { MarketStatisticsService } from '../shared/services/market-statistics.service';

@Component({
  selector: 'app-market-statistics',
  templateUrl: './market-statistics.component.html',
  styleUrls: ['./market-statistics.component.scss']
})
export class MarketStatisticsComponent implements OnInit {

  public chartMarketingStatisticsTopLabels = []
  public chartMarketingStatisticsTopType = 'pie'
  public chartMarketingStatisticsTopData = [
    { data: [], label: '' }
  ]
  public chartMarketingStatisticsTopColors: Array<any> = [
    {
      backgroundColor: [],
    }];
public chartMarketingStatisticsTopOptions = {
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
        console.log('data', data)
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var currentValue = dataset.data[tooltipItem.index]
        console.log('currentValue', currentValue)
        console.log('tooltipItem', tooltipItem)
        return data['labels'][tooltipItem.index] + ': ' + currentValue + " %"
      }
    }
  }
}







  public chartMarketingStatisticsCountLabels = []
  public chartMarketingStatisticsCountType = 'line'
  public chartMarketingStatisticsCountData = [
    { data: [], label: '' }
  ]
  public chartMarketingStatisticsCountColors: Array<any> = [
    {
      backgroundColor: 'rgb(170 161 200 / 70%)',
    }];

  public chartMarketingStatisticsCountOptions = {
    responsive: true,
    legend: {
      display: false,
      //position: 'top'
    },
  }



  public chartMarketingStatisticsPriceAvgLabels = []
  public chartMarketingStatisticsPriceAvgType = 'line'
  public chartMarketingStatisticsPriceAvgData = [
    { data: [], label: '' }
  ]

  public chartMarketingStatisticsPriceAvgOptions = {
    responsive: true,
    legend: {
      display: false,
      //position: 'top'
    },
  }
  public chartMarketingStatisticsPriceAvgColors: Array<any> = [
    {
      backgroundColor: 'rgb(170 161 200 / 70%)',
    }];



  

  constructor(
    private marketStatistics: MarketStatisticsService
    ) { }

  ngOnInit(): void {  

 

    window.addEventListener('resize', event => {
 
     this.legendDisplay();

    }, false);

    this.legendDisplay()
    this.showChartMarketStatistics()
  }

  legendDisplay() {
    if(document.documentElement.clientWidth <= 600) {
      this.chartMarketingStatisticsTopType = 'bar'
      this.chartMarketingStatisticsTopOptions['legend']['display'] = false
    } else {
      this.chartMarketingStatisticsTopType = 'pie'
      this.chartMarketingStatisticsTopOptions['legend']['display'] = true
    }
    this.showChartMarketStatistics()
  }


  showChartMarketStatistics() {
    
    this.marketStatistics.allStatistics().subscribe(response => {

      const colorsArr = ["#54478c","#2c699a","#048ba8","#0db39e","#16db93","#83e377","#b9e769","#efea5a","#f1c453","#f29e4c","#ffc09f","#ffee93","#fcf5c7","#a0ced9","#adf7b6"]

      console.log('result', response['result'])

      this.chartMarketingStatisticsTopLabels = []
      this.chartMarketingStatisticsTopData[0]['data'] = []
      this.chartMarketingStatisticsTopColors[0]['backgroundColor'] = []
      
      this.chartMarketingStatisticsCountLabels = []
      this.chartMarketingStatisticsCountData[0]['data'] = []

      this.chartMarketingStatisticsPriceAvgLabels = []
      this.chartMarketingStatisticsPriceAvgData[0]['data'] = []





      

      let rating = response['result'][0]['MS_RATING_MARK']
      let otherPercent = 0;
      for (let i = 0; i < rating.length; i++) {
        console.log(rating[i]['percent'])
        otherPercent += rating[i]['percent']
        this.chartMarketingStatisticsTopLabels.push(rating[i]['markTitle'])
        this.chartMarketingStatisticsTopData[0]['data'].push(rating[i]['percent'])
        this.chartMarketingStatisticsTopColors[0]['backgroundColor'].push(colorsArr[i])         
      }
      this.chartMarketingStatisticsTopLabels.push('Остальные марки')
      this.chartMarketingStatisticsTopData[0]['data'].push((100 - otherPercent).toFixed(2))


      for (let i = 0; i < response['result'].length; i++) { 
        this.chartMarketingStatisticsCountLabels.push(response['result'][i]['MS_DATE_CREATE'])
        this.chartMarketingStatisticsCountData[0]['data'].push(response['result'][i]['MS_CARS_COUNT'])
        
        this.chartMarketingStatisticsPriceAvgLabels.push(response['result'][i]['MS_DATE_CREATE'])
        this.chartMarketingStatisticsPriceAvgData[0]['data'].push(response['result'][i]['MS_CARS_PRICE_AVG'])        
      }



    })



  }


}
