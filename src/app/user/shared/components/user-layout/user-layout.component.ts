import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private roles: RolesService
  ) {


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
