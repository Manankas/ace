import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {getPicture} from '../../../utils/utils';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  public newImage: string;
  @Output() upload: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  public async getPicture() {
    this.newImage = await getPicture();
  }

  public submitUpload() {
    if (this.newImage) {
      this.upload.emit(this.newImage);
      this.newImage = undefined;
    }
  }
}
