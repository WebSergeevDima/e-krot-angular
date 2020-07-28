import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private roles: RolesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  privilege(privelege: string): boolean {
    if(this.roles.validatePrivilege(privelege) === true) {
      return true
    } else {
      return false
    }
  }


  logout() {
    console.log('Click Logout()')
    this.authService.logout()
    this.router.navigate(['/user', 'login'])
  }
}
