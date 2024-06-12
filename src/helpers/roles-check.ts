import { UserRole } from "../constants/enums/user-roles.enum";

export function checkRolesIfAllow(allowedRoles: string, userRoles?: string) {
  if (!userRoles) return false;
  return allowedRoles === userRoles;
}

export const isCustomer = (userRoles?: string) =>
  checkRolesIfAllow(UserRole.CUSTOMER, userRoles);

export const isManager = (userRoles?: string) =>
  checkRolesIfAllow(UserRole.MANAGER, userRoles);

export const isStaff = (userRoles?: string) =>
  checkRolesIfAllow(UserRole.STAFF, userRoles);
