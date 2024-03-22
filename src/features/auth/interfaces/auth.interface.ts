import { RoleType } from "../../../shared/enums/role-type.enum";

export interface PayloadToken {
  id: string,
  role: RoleType,
  email: string,
}