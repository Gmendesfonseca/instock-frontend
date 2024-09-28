export interface IUser {
  config: {
    auth2f: boolean;
    default_interface: 'LIGHT' | 'DARK';
    default_language: string;
    default_timezone: string;
    layout_name: string;
    master?: boolean;
  };
  profile_id: string;
  email: string;
  id: string;
  type: 'COMPANY' | 'PERSON';
  username: string;
}
