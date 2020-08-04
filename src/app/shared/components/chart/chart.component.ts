import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_GRID_LIST } from '@angular/material/grid-list/grid-list-base';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  public options: any;

  data = [
    {
      quarter: 'Q1',
      spending: 450,
    },
    {
      quarter: 'Q2',
      spending: 560,
    },
    {
      quarter: 'Q3',
      spending: 600,
    },
    {
      quarter: 'Q4',
      spending: 700,
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private chartService: ChartService
  ) {


    this.options = {
      data: this.data,
      series: [{
        xKey: 'quarter',
        yKey: 'spending',
      }],
    };


    /*
        this.options = {
          container: document.querySelector('#myChart'),
          data: [{ year: '2010', priceAvg: 42998338 }],
          title: {
            text: 'Total priceAvg to Museums and Galleries',
            fontSize: 18,
          },
          subtitle: {
            text: 'Source: Department for Digital, Culture, Media & Sport',
          },
          series: [
            {
              type: 'column',
              xKey: 'year',
              yKeys: ['priceAvg'],
              fills: ['#0084e7'],
              strokes: ['#00407f'],
              shadow: {
                enabled: true,
                xOffset: 3,
              },
            },
          ],
          axes: [
            {
              type: 'category',
              position: 'bottom',
              title: {
                text: 'Year',
              },
            },
            {
              type: 'number',
              position: 'left',
              title: {
                text: 'Total priceAvg',
              },
              label: {
                formatter: function (params) {
                  return params.value / 1000000 + 'M';
                },
              },
            },
          ],
          legend: {
            enabled: false,
          },
        };
    */


    /*
    this.options = {
      data: this.data,
      series: [{
        xKey: 'quarter',
        yKey: 'spending',
        yName: 'Coffee Spending',
      }],
      legend: {
        position: 'bottom',
      },
    };
  */

  }


  ngOnInit(): void {



    /*
        this.options.data = [
          { year: '2009', priceAvg: 40973087 },
          { year: '2010', priceAvg: 42998338 },
          { year: '2011', priceAvg: 44934839 },
          { year: '2012', priceAvg: 46636720 },
          { year: '2013', priceAvg: 48772922 },
          { year: '2014', priceAvg: 50800193 },
          { year: '2015', priceAvg: 48023342 },
          { year: '2016', priceAvg: 47271912 },
          { year: '2017', priceAvg: 47155093 },
          { year: '2018', priceAvg: 49441678 },
          { year: '2019', priceAvg: 50368190 },
        ];
    */

    this.activatedRoute.paramMap.subscribe(params => {

      console.log('uniqId2222:', params.get('uniqId'));

      const obj = {
        accessToken: localStorage.getItem('accessToken'),
        currency: localStorage.getItem('currency'),
        uniqId: params.get('uniqId')
      }

      this.chartService.userReport(obj).subscribe(response => {
        console.log(response)


        for (let item of response) {
          console.log(item)
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
    this.options.data.push({
      quarter: 'Q99',
      spending: 777,
    })
  }

}
