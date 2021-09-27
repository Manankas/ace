import {JsonArray} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {CustomField} from './Project';

export class Species {
  id? = Date.now();
  images?: JsonArray = JSON.parse('[]');
  archived = false;
  general = {
    name: '',
    description: '',
    lifespan: '',
    height: '',
    weight: '',
    diet: '',
    skillsAndAbilities: '',
    weakness: '',
    viewAndMoral: ''
  };
  appearance = {
    physical: '',
    mental: ''
  };
  lifeStyle = {
    commonLocations: '',
    habitats: '',
    reproduction: '',
    growthStages: '',
    majorStages: '',
    majorEthnicGroup: ''
  };
  background = {
    origin: '',
    history: '',
    religiousConnections: '',
    commonCulturalInfluences: ''
  };
  avatar? = '';
  customFields: CustomField[] = [];
}
