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

  openDialog() {
    this.dialog.open(DialogMessageNoLoging);
  }

  ngOnInit(): void {
    this.roles.getRole()
  }

  whatRole() {
    this.roles.whatRole()
  }

  getRole(role: string): boolean {
    return this.roles.validateRole(role)
  }

}

@Component({
  templateUrl: '../../../../shared/dialog/message-no-login/message-no-login.html'
})
export class DialogMessageNoLoging { }