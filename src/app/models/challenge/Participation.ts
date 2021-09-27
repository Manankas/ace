export class Comment {
  id? = 0;
  userId = '';
  content = '';
}
export class Participation {
  id?: string;
  challengeId = '';
  userId = '';
  title = '';
  content: string;
  finished = false;
  createdAt = Date.now();
  like: string[] = [];
  comments: Record<number, Comment>|Comment[] = {};
}
