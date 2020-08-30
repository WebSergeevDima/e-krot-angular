import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from './services/registration.service';
import { NewUser } from '../shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DialogRegistrationComponent } from 'src/app/shared/components/dialog-registration/dialog-registration.component';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  formRegistration: FormGroup

  constructor(
    private registrationService: RegistrationService,
    public dialog: MatDialog
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

      if (response['validation']) {

        this.dialog.open(DialogRegistrationComponent, {
          data: {
            title: 'Вы успешно зарегистрировались!',
            content: 'Теперь можете авторизоваться',
            styles: 'dialog_blue'
          }
        });


      } else {


        this.dialog.open(DialogComponent, {
          data: {
            title: response['message'],
            content: '',
            btnClose: 'Закрыть',
            btnClosePosition: 'center',
            styles: 'dialog_red'
          }
        });

      }

    })


  }

}
