import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Image} from '../image-modal.component';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  @Input()images: Image[];
  @Output()select = new EventEmitter<Image>();
  constructor() { }

}
