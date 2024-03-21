import { RoleType } from "../../../shared/enums/role-type.enum";

export interface PayloadToken {
  role: RoleType,
  sub: string,
};