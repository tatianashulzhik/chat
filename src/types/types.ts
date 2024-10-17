import { RoleType } from "src/roles/roles.entity";

export interface IUser {
  id: number;
  username: string;
  role: RoleType;
}
