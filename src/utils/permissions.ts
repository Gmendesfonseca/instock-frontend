export type RoutePermissionType = string | (string | string[]);

export type RoutePermissions = {
  COMPANY_ACCESS: RoutePermissionType[];
  PERSON_ACCESS: RoutePermissionType[];
};

export const routePermissions: RoutePermissions = {
  COMPANY_ACCESS: ['COMPANY', ['PERSON', 'in_check']],
  PERSON_ACCESS: ['PERSON'],
};

export enum Permissions {
  COMPANY_ACCESS = 'in_check',
  COLLABORATORS_ACCESS = 'list_collaborators',
  SECTORS_ACCESS = 'list_sectors',
  UNITS_ACCESS = 'list_units',
}
