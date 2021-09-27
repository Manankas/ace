
export class Note {
  id? = Date.now();
  name = '';
  parentId = 0;
  content? = '';/**folder if no content*/
  archived = false;
}
