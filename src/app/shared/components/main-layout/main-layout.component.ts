import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  selected: String = '2'

  constructor(
    private roles: RolesService
  ) { }
  whatRole() {
    this.roles.whatRole()
  }

  getRole(role: string): boolean {
    return this.roles.validateRole(role)
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
