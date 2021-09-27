export class Follower {
  id? = '';
  partners: string[] = [];/*[userId, followerId]**/
  confirmed = false;
  lastConversation = 0;
  createdAt = Date.now()
}
