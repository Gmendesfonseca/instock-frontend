import api from '../api';
import { NewProject, ProjectItem } from './types';

export async function getProjectsByCompany(
  company_id: string
): Promise<ProjectItem[]> {
  const response = await api.get(`/projects/companies/${company_id}`);
  return response.data;
}

export async function getProject(project_id: string): Promise<ProjectItem> {
  const response = await api.get(`/projects/${project_id}`);
  return response.data;
}

export async function createProject(project: NewProject): Promise<ProjectItem> {
  const response = await api.post('/projects', project);
  return response.data;
}

export async function updateProject(
  project: ProjectItem
): Promise<ProjectItem> {
  const response = await api.put(`/projects/${project.id}`, project);
  return response.data;
}

export async function deleteProject(project_id: string): Promise<void> {
  await api.delete(`/projects/${project_id}`);
}
