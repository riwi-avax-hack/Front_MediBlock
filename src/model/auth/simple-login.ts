import { ApiResponse } from '../shared/http.model';

export interface IAccessTokenResp {
  access_token: string;
  token_type: string;
}

export type ILoginResp = ApiResponse<IAccessTokenResp>;
