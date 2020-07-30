import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private roles: RolesService
  ) { }



  /*
  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'dialog_red',
      data: {
        title: 'Внимание!!',
        content: 'Введите корректные данные!!',
        btnClose: 'Закрыть'
      }
    });
  }
  */

  ngOnInit(): void {

    this.roles.getRole()

  }

}
