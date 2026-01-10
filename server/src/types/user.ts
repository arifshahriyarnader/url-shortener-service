export interface IUser {
  id: number;
  name: string | null;
  email: string;
  password: string;
  created_at: Date;
}
