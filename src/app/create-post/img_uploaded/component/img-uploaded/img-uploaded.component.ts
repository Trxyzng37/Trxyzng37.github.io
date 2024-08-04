import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Img } from 'src/app/create-post/pojo/img';

@Component({
  selector: 'app-img-uploaded',
  templateUrl: './img-uploaded.component.html',
  styleUrl: './img-uploaded.component.scss'
})
export class ImgUploadedComponent {
  public constructor(

  ) {}

  @Input() img: string = "";
  @Input() id: number = 0;
  @Input() selected_id: number = -1;
  @Input() arr: Img[] = [];

  @Output() selectImgOutput = new EventEmitter<number>;
  @Output() deleteImgOutput = new EventEmitter<number>;

  selectImg() {
    this.selectImgOutput.emit(this.id);
    this.selected_id = this.arr.length === 1 ? -1 : this.id;
  }

  deleteImage() {
    this.deleteImgOutput.emit(this.id);
  }
}
