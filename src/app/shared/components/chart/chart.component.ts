import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';

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
    private chartService: ChartService
  ) {


    this.options = {
      container: document.querySelector('#myChart'),
      data: [
        { year: '2009', visitors: 40973087 },
        { year: '2010', visitors: 42998338 },
        { year: '2011', visitors: 44934839 },
        { year: '2012', visitors: 46636720 },
        { year: '2013', visitors: 48772922 },
        { year: '2014', visitors: 50800193 },
        { year: '2015', visitors: 48023342 },
        { year: '2016', visitors: 47271912 },
        { year: '2017', visitors: 47155093 },
        { year: '2018', visitors: 49441678 },
        { year: '2019', visitors: 50368190 },
      ],
      title: {
        text: 'Total Visitors to Museums and Galleries',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: Department for Digital, Culture, Media & Sport',
      },
      series: [
        {
          type: 'column',
          xKey: 'year',
          yKeys: ['visitors'],
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
            text: 'Total visitors',
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
  }

}
