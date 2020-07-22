import { Component, OnInit } from '@angular/core';
import { RolesService } from '../shared/services/roles.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private roles: RolesService
  ) { }

  ngOnInit(): void {
  }

  getRole(role: string): boolean {
    return this.roles.validateRole(role)
  }

}
