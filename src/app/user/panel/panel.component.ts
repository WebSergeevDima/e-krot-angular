import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  uniqId
  constructor(
    private roles: RolesService,
    private currencyService: CurrencyService,
    private activatedRoute: ActivatedRoute
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

