import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  constructor(
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {


    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  submit() {

    //console.log(this.form)

    if (this.form.invalid) {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    //console.log(user)

    this.authService.login(user).subscribe(response => {

      if (!response) {
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Ошибка входа в личный кабинет',
            content: 'Пожалуйста, проверьте корректность вводимых данных',
            btnClose: 'Закрыть',
            btnClosePosition: 'center',
            styles: 'dialog_red'
          }
        })
      }
    })

  }

}