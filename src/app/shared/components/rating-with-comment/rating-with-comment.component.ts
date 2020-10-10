import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PanelService } from 'src/app/user/shared/services/panel.service';
import { RatingService } from '../../services/rating.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-rating-with-comment',
  templateUrl: './rating-with-comment.component.html',
  styleUrls: ['./rating-with-comment.component.scss']
})
export class RatingWithCommentComponent implements OnInit {

  @Input() uniqId: string

  form: FormGroup
  flagRatingDown: boolean = false
  flagRatingUp: boolean = false

  constructor(
    private ratingService: RatingService,
    private panelService: PanelService,
    private dialog: MatDialog
  ) {

    this.panelService.updateReportEmitter.subscribe(response => {
      this.flagRatingUp = false
      this.flagRatingDown = false
      this.form.reset()
    })

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      name: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      comment: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    })
  }

  ratingUp() {
    this.flagRatingUp = true
    this.ratingService.create({
      uniqId: this.uniqId,
      result: 1
    }).subscribe((resolve) => { 

      this.dialog.open(DialogComponent, {
        data: {
          title: 'Спасибо за вашу оценку!',
          content: 'Благодарим, что нашли время и возможность оценить нас!',
          btnClose: 'Закрыть',
          btnClosePosition: 'center',
          styles: 'dialog_green'
        }
      })

    })
  }

  ratingDown() {
    this.flagRatingDown = true
    this.ratingService.create({
      uniqId: this.uniqId,
      result: 0
    }).subscribe((resolve) => { 

      this.dialog.open(DialogComponent, {
        data: {
          title: 'Спасибо за вашу оценку!',
          content: 'Для нас очень важно выявить недостатки нашего сервиса и разобраться в ситуации. Будем благодарны, если оставите свои контактные данные и опишите что вызволо у Вас недовольство.',
          btnClose: 'Закрыть',
          btnClosePosition: 'center',
          styles: 'dialog_green'
        }
      })

    })
  }

  submit() {

    if (this.form.invalid || !this.form.value.name.trim() || !this.form.value.comment.trim() || !this.form.value.email.trim()) {
      return
    }

    const obj = {
      uniqId: this.uniqId,
      message: this.form.value.comment,
      name: this.form.value.name,
      email: this.form.value.email
    }

    this.form.reset()
    this.flagRatingDown = false
    this.flagRatingUp = true

    this.ratingService.addComment(obj).subscribe((resolve) => {
      
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Спасибо, Ваш отзыв принят!',
          content: 'Будьте уверены, Ваш комментарий не останется без внимания!',
          btnClose: 'Закрыть',
          btnClosePosition: 'center',
          styles: 'dialog_green'
        }

      })

    })

  }

}
