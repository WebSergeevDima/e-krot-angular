import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PanelService } from 'src/app/user/shared/services/panel.service';
import { RatingService } from '../../services/rating.service';

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
    private panelService: PanelService
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
    }).subscribe((resolve) => { })
  }

  ratingDown() {
    this.flagRatingDown = true
    this.ratingService.create({
      uniqId: this.uniqId,
      result: 0
    }).subscribe((resolve) => { })
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

      console.log(resolve)

    })

  }

}
