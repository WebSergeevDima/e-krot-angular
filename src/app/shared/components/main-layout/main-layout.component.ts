import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    private roles: RolesService,
    public dialog: MatDialog
  ) { }
  whatRole() {
    this.roles.whatRole()
  }

  privilege(privelege: string): boolean {
    return this.roles.validatePrivilege(privelege)
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'dialog_white',
      data: {
        title: 'Внимание!!',
        content: 'Введите корректные данные!!',
        btnClose: 'Закрыть'
      }
    });
  }

  ngOnInit(): void {

    this.roles.getRole()

    /*
        const axi = this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(resolve => {
          console.log(resolve)
          return resolve
        })
    
    */


    /*
 async function postData(url = ''){
 
   let user = {
   name: 'John',
   surname: 'Smith'
 };
   const response = await fetch(url, {
     mode: 'cors',
     method: 'POST',
   headers: {
     'Content-Type': 'application/json;charset=utf-8'
   },
     //redirect: 'follow', 
     //referrerPolicy: 'no-referrer',
     body: JSON.stringify(user)
   });
   return await response.json(); 
 }
 
 postData('https://etalonocenki/api/auto/')
   .then((data) => {
     console.log(data);
   });
 
 */
  }

}
