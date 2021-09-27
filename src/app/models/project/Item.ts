import {JsonArray} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {CustomField} from './Project';

export class Item {
  id? = Date.now();
  images?: JsonArray = JSON.parse('[]');
  avatar? = '';
  archived = false;
  general = {
    name: '',
    description: '',
    purpose: '',
    specialAbilitiesAndProperties: '',
    collection: '',
    production: '',
    composition: '',
    value: '',
    rarity: '',
    occurrence: '',
    detectionMethods: '',
    armaments: '',
    defense: '',
    otherEquipment: ''
  };
  history = {
    history: '',
    origin: '',
    notableOwners: '',
  };
  customFields: CustomField[] = [];
}
