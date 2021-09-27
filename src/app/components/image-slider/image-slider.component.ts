import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {ImageModalComponent} from '../image-modal/image-modal.component';
import {JsonArray} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit {
  public slideOpts = {
    initialSlide: 1,
    speed: 400,
    spaceBetween: 4,
    centredSlides: false,
    slidesPerView: 2.8,
  };

  @Input() srcImages: JsonArray = [];
  @Input()projectId: string;
  @Input()collectionPath: string;
  @Input()collectionId: number;

  @Output() clickImage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private modalController: ModalController,
    private projectService: ProjectService
  ) {}

  ngOnInit() {}

  async onClickAdd() {
    const modal = await this.modalController.create({
      component: ImageModalComponent
    });
    modal.onWillDismiss().then(async ({ data }) => {
      if(data.image.name !== '') {
        this.srcImages.unshift(data.image.url);
        if(this.projectId) {
          this.projectService
            .updateMap(this.projectId, this.collectionPath, {
              id: this.collectionId,
              avatar: data.image.name
            });
        }
      }
    })
    await modal.present();
  }

  onClickImage(data?: any) {
    this.clickImage.emit(data);
  }
}
