import { AxiosResponse } from "axios";

export interface LoginData {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      userRole: string
    };
  };
}

export interface LoginError {
  response: AxiosResponse;
}
