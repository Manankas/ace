import {
  Accessories,
  AccessoriesColor,
  ClotheGraphics,
  Clothes,
  ClothesColor,
  Eyebrow,
  Eyes,
  FacialHair,
  HairColor,
  HatColor,
  Mouth,
  Skin,
  Style,
  Top,
} from '@dicebear/avatars-avataaars-sprites/lib/options';

export type AvatarValues = {
  style: number;
  hairColor: number;
  hatColor: number;
  top: number;
  accessories: number;
  accessoriesColor: number;
  facialHair: number;
  clothes: number;
  clothesColor: number;
  eyes: number;
  eyebrow: number;
  mouth: number;
  skin: number;
  clotheGraphics: number;
};

export type AvatarOptions = {
  style: Style[];
  hairColor: HairColor;
  hatColor: HatColor;
  top: Top;
  accessories: Accessories;
  accessoriesColor: AccessoriesColor;
  facialHair: FacialHair;
  clothes: Clothes;
  clothesColor: ClothesColor;
  eyes: Eyes;
  eyebrow: Eyebrow;
  mouth: Mouth;
  skin: Skin;
  clotheGraphics: ClotheGraphics;
};

export type CreateAvatarOption = {
  style: Style;
  hairColor: HairColor;
  hatColor: HatColor;
  top: Top;
  accessories: Accessories;
  accessoriesColor: AccessoriesColor;
  facialHair: FacialHair;
  clothes: Clothes;
  clothesColor: ClothesColor;
  eyes: Eyes;
  eyebrow: Eyebrow;
  mouth: Mouth;
  skin: Skin;
  clotheGraphics: ClotheGraphics;
};
