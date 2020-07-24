import { Component, OnInit } from '@angular/core';
import { RolesService } from '../shared/services/roles.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

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
    return this.roles.validatePrivilege(privelege)
  }


  logout() {
    console.log('Click Logout()')
    this.authService.logout()
    this.router.navigate(['/user', 'login'])
  }
}
