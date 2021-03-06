import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  uniqId
  constructor(
    private roles: RolesService
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
   
  }
}

