export class Task {
  id = Date.now();
  status = 0;
  marked = false;
  content = '';
  archived = false;
  updatedAt = Date.now();
}
