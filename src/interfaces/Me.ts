import {
  ProjectViewType,
  RequestsSolicitation,
  ShowCalendar,
  ShowFriends,
  ShowLocation,
  ShowProjects,
  ViewListFriends,
} from '@/interfaces/ProfileConfig';

export interface MeCompany {
  id: string;
  name: string;
  logo: string | null;
  avatar: string;
  user_id: string;
  is_manager_competence: boolean;
  company_user: {
    id: string;
    username: string;
  };
  my_collaborator_id: {
    id: string;
  };
}

export interface PersonConfig {
  created_at: string;
  default_timezone: string;
  id: string;
  people_share_my_publications: boolean;
  person_id: string;
  project_view: ProjectViewType;
  requests_solicitation: RequestsSolicitation;
  seo: boolean;
  show_calendar: ShowCalendar;
  show_friends: ShowFriends;
  show_location: ShowLocation;
  show_projects: ShowProjects;
  updated_at: string;
  view_list_friends: ViewListFriends;
}

export interface CompanyConfig {
  id: string;
  company_id: string;
  default_timezone: string;
  seo: boolean;
  show_calendar: string;
  show_location: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  people_share_my_publications: boolean;
}

export interface UserConfig {
  auth2f: boolean;
  default_interface: 'LIGHT' | 'DARK';
  default_language: string;
  default_timezone: string;
  id: string;
  user_id: string;
}

export interface MeProps {
  user_id: string;
  username: string;
  social_name: string;
  name: string;
  logo: string | null;
  type: 'COMPANY' | 'PERSON';
  profile_id: string;
  avatar: string;
  companies: MeCompany[];
  profile_config: PersonConfig & CompanyConfig;
  user_config: UserConfig;
}
