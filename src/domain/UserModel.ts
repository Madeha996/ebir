export interface UserModel {
  id: number;
  name: string;
  email: {
    name: string;
    verified: boolean;
  };
}
