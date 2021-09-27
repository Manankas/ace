export type User = {
  id?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  pseudo?: string;
  password?: string;
  dateCreate?: number;
  dateUpdate?: number;
  telephone?: string[];
  avatar?: any;
  banner?: any;
  coverPhoto?: string;
  isNewUser?: boolean;
  description?: string;
  isPrivate?: boolean;
  isAdmin?: boolean;
  biography?: string;
};
