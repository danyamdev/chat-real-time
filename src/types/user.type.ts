export type TUser = {
  _id: string;
  login: string;
  createdAt: string;
  updatedAt: string;
}

export type TUserToken = Omit<TUser, '_id' | 'createdAt' | 'updatedAt'> & {
  userId: string;
}