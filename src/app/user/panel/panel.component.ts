import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {


  constructor(
    private roles: RolesService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {

  }

  whatRole() {
    this.roles.whatRole()
  }

  privilege(privelege: string): boolean {
    return this.roles.validatePrivilege(privelege)
  }
  myMethod(e) {
    console.log('принято: ' + e)
  }
}

