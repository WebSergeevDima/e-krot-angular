import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../shared/services/panel.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public report = {
    tradeIn: {},
    oldCars: {}
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private panelService: PanelService
  ) {

  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {

      console.log('uniqId', params.get('uniqId'));

      this.panelService.getUserReport(params.get('uniqId'), localStorage.getItem('accessToken')).subscribe(resolve => {
        this.report = resolve['report']
      })

    });

  }

}
