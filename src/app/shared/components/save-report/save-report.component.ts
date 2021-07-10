import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, Input, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { ReportService } from '../../services/report.service';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-save-report',
  templateUrl: './save-report.component.html',
  styleUrls: ['./save-report.component.scss']
})
export class SaveReportComponent implements OnInit {

  @Input() uniqId: string
  loadingBlock = false

  constructor(
    private reportService: ReportService,
    public currencyService: CurrencyService,
    private roles: RolesService    
    ) { }

  ngOnInit(): void {
  }

  save() {

    this.loadingBlock = true

    this.reportService.saveReportPdf(this.uniqId, this.currencyService.getCurrency()).subscribe(resolve => { 

        console.log('resolve: ', resolve)
        this.downloadPdf(resolve['pdf'])
        this.loadingBlock = false

    })

  }

  downloadPdf(urlPdf){
    var linkDownloadPdf = document.createElement('a')     
      linkDownloadPdf.href = urlPdf
      linkDownloadPdf.download = 'report.pdf'
      document.body.appendChild(linkDownloadPdf)
      linkDownloadPdf.click() 
    }

    privilege(privelege: string): boolean {
      return this.roles.validatePrivilege(privelege)
    }

}
