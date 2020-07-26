import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';


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
    this.dialog.open(DialogComponent);
  }

  ngOnInit(): void {
    this.roles.getRole()
    console.log('11111111111')

    this.dialog.open(DialogComponent, {
      data: {
        title: 'Внимание!!'
      }
    });

    console.log('222222222222')
  }

  whatRole() {
    this.roles.whatRole()
  }

  privilege(privelege: string): boolean {
    return this.roles.validatePrivilege(privelege)
  }

}

/*
@Component({
  templateUrl: '/src/app/shared/dialog/message-no-login/message-no-login.html'
})
export class DialogMessageNoLoging {
  title = 'Внимание!!'
  content = 'Введите корректные данные!!'
}*/