import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rating-with-comment',
  templateUrl: './rating-with-comment.component.html',
  styleUrls: ['./rating-with-comment.component.scss']
})
export class RatingWithCommentComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  ratingUp() {

  }

  ratingDown() {

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
