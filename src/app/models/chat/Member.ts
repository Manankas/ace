export type Member = {
  id?: string;
  collaborationId: string;
  userId: string;
  banned: boolean;
  role: 0|1|2|3;/**new member, reader, editor, owner*/
  active: boolean;/**'collaborateur', 'invitation'*/
  createdAt: number;
}
