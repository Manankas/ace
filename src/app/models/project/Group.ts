import {CustomField} from './Project';

export class Group {
  id? = Date.now();
  parentId = 0; /**no parent*/
  members: number[] = []; /**member*/
  images?: string[] = [];
  avatar? = '';
  archived = false;
  general = {
    name: '',
    description: '',
    alternateNames: '',
    biggestAchievement: '',
    otherAchievements: '',
    biggestFailure: '',
    otherFailures: '',
    territory: '',
    headquarter: '',
    transport: '',
    technologyAndScience: '',
    uniquePossessions: '',
  };
  culture = {
    culture: '',
    flag: '',
    slogan: '',
    philosophy: '',
    longTermGoals: '',
    shortTermGoals: '',
    traditions: '',
    rules: '',
    associatedTrademarkItem: '',
    punishments: '',
    treasures: '',
  };
  history = {
    origin: '',
    founder: '',
    foundingDate: '',
    foundingHistory: '',
    majorHistoricalEvents: '',
    dissolutionDate: '',
    dissolutionHistory: '',
  };
  ranks = {
    socialHierarchy: '',
    highest: '',
    secondHighest: '',
    thirdHighest: '',

    firstMedium: '',
    secondMedium: '',
    thirdMedium: '',

    thirdLower: '',
    secondLower: '',
    lowest: '',
  };
  customFields: CustomField[] = [];
}
