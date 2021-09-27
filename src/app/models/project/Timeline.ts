export class Event {
  name = '';
  description = '';
}
export class  Moment {
  name = '';
  events: Event[] = [];
}
export class Timeline {
  archived = false;
  id = Date.now();
  name = '';
  description = '';
  moments: Moment[] = [];
}
