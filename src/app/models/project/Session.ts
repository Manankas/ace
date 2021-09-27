export class Session {
  id = Date.now();
  updatedAt = Date.now();
  wordCount = 0;/*For standard account**/
  closed = false;
  archived = false;
}
