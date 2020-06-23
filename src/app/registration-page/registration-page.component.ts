import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './services/registration.service';
import { NewUser } from '../shared/interfaces';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  formRegistration: FormGroup

  constructor(
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.formRegistration = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  submit() {

    //console.log(this.form)

    if (this.formRegistration.invalid) {
      return
    }

    const user: NewUser = {
      name: this.formRegistration.value.name,
      email: this.formRegistration.value.email,
      password: this.formRegistration.value.password
    }

    //console.log(user)


    this.registrationService.createUser(user).subscribe(response => {

    })


  }

}
