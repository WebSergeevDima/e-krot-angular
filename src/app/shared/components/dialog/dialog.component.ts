import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public title: string
  public content: string
  public btnClose: string
  public styles: string

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.title = data.title
      this.content = data.content
      this.btnClose = data.btnClose
      this.styles = data.styles

  }

  ngOnInit(): void {
  }

}
