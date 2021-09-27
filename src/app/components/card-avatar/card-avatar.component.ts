import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-avatar',
  templateUrl: './card-avatar.component.html',
  styleUrls: ['./card-avatar.component.scss'],
})
export class CardAvatarComponent implements OnInit {
  @Input() cardType: 'square' | 'rectangle' | 'profil' = 'square';

  @Input() imageSrc: string;

  @Input() name: string;

  @Input() isAddCard = false;

  @Input() loading = false;

  @Input() isProfil = false;

  constructor() {}

  ngOnInit() {}
}
