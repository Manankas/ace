import { JsonArray } from '@angular/compiler-cli/ngcc/src/packages/entry_point';

import { AvatarValues } from 'src/app/services/avatar-generator/avatar-generator.type';

import { CustomField } from './Project';

export class Character {
  id? = Date.now();
  images?: JsonArray = JSON.parse('[]');
  avatar? = '';
  avatarGenerator?: AvatarValues | null = null;
  archived = false;
  general = {
    name: '',
    description: '',
    age: '1',
    gender: '0' /*0|1*/,
    dateOfBirth: '',
    job: '',
    jobSatisfaction: '',
    health: '',
    relationships: '',
    pets: '',
    world: '',
    areaOfResidence: '',
    neighbourhood: '',
    homeDescription: '',
  };
  appearance = {
    height: '1',
    weigh: '',
    ethnicity: '',
    skinTone: '',
    eyeColor: '',
    hairStyle: '',
    distinguishFeature: '',
    otherFacialFeatures: '',
    bodyType: '',
    clothingStyle: '',
    accessories: '',
  };
  personality = {
    skills: '',
    incompetence: '',
    talent: '',
    weakness: '',
    hobbies: '',
    habits: '',
    moral: '',
    selfControl: '',
    motivation: '',
    discouragement: '',
    confidenceLevel: '',
    greatestFear: '',
  };
  history = {
    childhood: '',
    importantPastEvent: '',
    bestAccomplishment: '',
    otherAccomplishment: '',
    failure: '',
    secrets: '',
    bestMemories: '',
    worstMemories: '',
  };
  story = {
    storyRole: '',
    shortTermGoals: '',
    longTermGoals: '',
  };
  customFields: CustomField[] = [];
}
