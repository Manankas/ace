import {JsonArray} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {CustomField} from './Project';

export class WLocation {
  id? = Date.now();
  parentId = 0;/**no parent*/
  images?: JsonArray = JSON.parse('[]');
  archived = false;
  general = {
    name: '',
    description: '',
    dimension: '',
    objects: '',
    condition: '',
    feeling: '',
    noises: '',
    smell: ''
  };
  biologyAndEnvironment = {
    climate: '',
    landMarks: '',
    flora: '',
    fauna: '',
    bodiesOfWater: '',
    pollution: ''
  };
  culture = {
    inhabitants: '',
    language: '',
    rituals: '',
    generalEthics: '',
    artAndMusic: '',
    viewsOnLife: '',
    viewsOnDeath: '',
    genderRaceEquality: '',
  };
  politics = {
    governmentSystem: '',
    politicalParties: '',
    importantPoliticalParties: '',
    opinionOfPublic: '',
    laws: '',
    punishments: '',
    lawEnforcement: '',
    fieldOpposingForcingMissing: '',
  };
  magicAndTechnology = {
    magic: '',
    technologicalLevel: '',
    uniqueTechnologies: '',
    medicineAndHealHealthCare: '',
    ethicalControversies: ''
  };
  histories = {
    dateFounded: '',
    founder: '',
    majorEvent: '',
  };
  religion = {
    deities: '',
    groups: '',
    leadersAndProphets: '',
    founding: '',
    valuesCommandments: '',
    view: '',
    freedom: ''
  };
  tradeAndPublicRelations = {
    currency: '',
    war: '',
    tradePartners: '',
    majorImports: '',
    majorExports: '',
  };
  avatar? = '';
  customFields: CustomField[] = [];
}
