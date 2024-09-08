import { ApiResponse } from '../shared/http.model';

export interface IAccessTokenResp {
  user: IUser;
  token: {
    access_token: string;
    token_type: string;
  };
}

export interface IUser {
  id: number;
  names: string;
  lastnames: string;
  email: string;
  phone: string;
  roles: string;
  created_at: string;
  updated_at: string;
  picture: string;
}

export type ILoginResp = ApiResponse<IAccessTokenResp>;
