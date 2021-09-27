import {JsonArray} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

export class Message {
  id? = '';
  convId: JsonArray|string = [];/**[senderId, receiverId]*/
  createdAt: number;
  content = '';
  type = 0;/*Message privé|Message de collaboration*/
  read = false;
}

