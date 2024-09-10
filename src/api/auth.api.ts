import { httpApi } from "@app/api/http.api";
import "./mocks/auth.api.mock";
import { UserModel } from "@app/domain/UserModel";

export interface AuthData {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserModel;
}

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi
    .post<LoginResponse>(`login`, loginPayload)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
