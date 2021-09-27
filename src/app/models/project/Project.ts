import {Character} from './Character';
import {Group} from './Group';
import { WLocation } from './WLocation';
import {Item} from './Item';
import {Species} from './Species';
import { Note } from './Note';
import {Task} from './Task';
import {Timeline} from './Timeline';
import {Chapter} from './Chapter';

const date = Date.now();
export class Project {
  id? = '';
  userId = '';
  name = '';
  resume = '';
  size = 1;
  sizeType = 0 /**index de typesTaille*/;
  gender = 0;
  startAt = date;
  endAt = date;
  createdAt = date;
  updatedAt = date;
  avatar = '' /*Image*/;
  archived = false;
  notify = false;
  timelines: Record<number, Timeline>|Timeline[]= {};
  characters: Record<number, Character>|Character[]= {};
  groups: Record<number, Group>|Group[]= {};
  wLocations: Record<number, WLocation>|WLocation[]= {};
  items: Record<number, Item>|Item[]= {};
  species: Record<number, Species>|Species[]= {};
  notes: Record<number, Note>|Note[]= {};
  tasks: Record<number, Task>|Task[]= {};
  chapters: Record<number, Chapter>|Chapter[]= {};
}
export class CustomField {
  name = '';
  value = ''
}
