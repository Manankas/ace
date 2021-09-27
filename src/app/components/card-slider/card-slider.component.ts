import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

import { AvatarGeneratorService } from 'src/app/services/avatar-generator/avatar-generator.service';
import { AvatarValues } from 'src/app/services/avatar-generator/avatar-generator.type';

@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
})
export class CardSliderComponent implements OnInit {
  @Input() slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 4,
    centredSlides: false,
    slidesPerView: 2.8,
  };
  @Input() srcImages: string[];

  @Input() cardType: 'square' | 'rectangle' | 'profil' = 'square';

  @Input() datas: any;
  @Input() filter: number;
  @Input() showName = true;

  @Input() loading = false;

  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  @Output() clickCard: EventEmitter<number> = new EventEmitter<number>();

  constructor(private avatarGeneratorService: AvatarGeneratorService) {}

  ngOnInit() {}

  onClickAdd() {
    this.clickAdd.emit();
  }

  onClickCard(index: number) {
    console.log(123);
    this.clickCard.emit(index);
  }

  public avatarToSvg(avatarValues: AvatarValues): SafeHtml {
    return this.avatarGeneratorService.createAvatarSvg(
      this.avatarGeneratorService.createAvatarOption(avatarValues)
    );
  }
}
