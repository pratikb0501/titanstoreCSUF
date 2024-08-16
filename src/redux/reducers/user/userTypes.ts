export type InitialUserState = {
  usersList: User[];
  isLoading: boolean;
  isError: string | null;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
}

export type GetAllUsersResponse = {
  success: boolean;
  users: User[];
};

export type CreateUserResponse = {
  success: boolean;
  message: string;
};

export type GetUserByIdResponse = {
  success: boolean;
  user: User;
};

export type UserReducerInitState={
  loading:boolean,
  user:User | null
}
