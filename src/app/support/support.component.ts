import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SupportService } from './services/support.service';
import { FeedbackMessage } from '../shared/interfaces';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from '../shared/services/roles.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  form: FormGroup

  constructor(
    private support: SupportService,
    public dialog: MatDialog,
    private roles: RolesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      comment: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    })
  }

  privilege(privelege: string): boolean {
    return this.roles.validatePrivilege(privelege)
  }

  submit() {

    //console.log(this.form)



    if (this.form.invalid || !this.form.value.name.trim() || !this.form.value.comment.trim()) {
      return
    }

    const feedback: FeedbackMessage = {
      message: this.form.value.comment,
      name: this.form.value.name,
      email: this.form.value.email,
      tokenAccess: localStorage.getItem('accessToken')
    }

    this.support.sendMessage(feedback).subscribe(response => {
      console.log('response', response)


      if (response['validation']) {
        this.form.reset()
        this.dialog.open(DialogComponent, {
          data: {
            title: 'Спасибо, ваше сообщение отправлено!',
            content: 'Мы проанализируем сообщение и обязательно вам ответим',
            btnClose: 'Закрыть',
            btnClosePosition: 'center',
            styles: 'dialog_blue'
          }
        })

      } else {

        this.dialog.open(DialogComponent, {
          data: {
            title: 'Ошибка отправки сообщения!',
            content: 'Пожалуйста, напишите на почту support@e-krot.com',
            btnClose: 'Закрыть',
            btnClosePosition: 'center',
            styles: 'dialog_red'
          }
        })

      }


    })


  }


}
