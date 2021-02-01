import { Component, OnInit } from '@angular/core';
import { RolesService } from '../shared/services/roles.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {



  constructor(
    private roles: RolesService,
  ) {
  }

  ngOnInit(): void {
  }

  privilege(privelege: string): boolean {
    return this.roles.validatePrivilege(privelege)
  }

  scrollingTo(block) {

    const blockEl = document.querySelector('[data-block="'+block+'"]')

    blockEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  }

/*

  scrollingToAssessment() {

    const assessment = document.querySelector('[data-block="assessment"]')

    assessment.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

  }
*/
}
