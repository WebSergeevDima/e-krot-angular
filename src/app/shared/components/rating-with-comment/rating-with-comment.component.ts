import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      name: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2)]),
      comment: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    })
  }

  ratingUp() {
    this.flagRatingUp = true
    console.log('flagRatingUp', this.uniqId)
  }

  ratingDown() {
    this.flagRatingDown = true    
    console.log('ratingDown', this.uniqId)
  }

  submit() {

    //console.log(this.form.controls.email)



    if (this.form.invalid || !this.form.value.name.trim() || !this.form.value.comment.trim()) {
      return
    }

    const feedback = {
      message: this.form.value.comment,
      accessToken: localStorage.getItem('accessToken')
    }


  }

}
