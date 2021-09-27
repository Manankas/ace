import {Session} from './Session';

export class Chapter {
  id = Date.now();
  num = '';
  title = '';
  summary = '';
  wordCount = 0;
  status = false;/**Terminé, non terminé*/
  archived = false;
  sessions: Session[] = []
}

