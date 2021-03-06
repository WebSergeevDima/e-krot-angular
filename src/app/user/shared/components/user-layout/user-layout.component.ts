import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor(
    private roles: RolesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.roles.getRole()
  }

  whatRole() {
    this.roles.whatRole()
  }

  privilege(privelege: string): boolean {
    return this.roles.validatePrivilege(privelege)
  }

}
