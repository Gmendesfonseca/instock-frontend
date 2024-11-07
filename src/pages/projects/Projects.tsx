import { useState, useEffect, useMemo, SetStateAction } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './projects.css';
import Filter from '@/components/filter/Filter';
import NewProjects from '@/components/new_projects/NewProjects';
import { ProjectItem } from '@/services/projects';
import ProjectItems from './ProjectItems';
import { getProject } from '@/services/projects/requests';

const projectId = '75cca565-6a02-4701-a9c3-8f9f72e1f796';

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [colors] = useState({
    ACTIVE: '#6fbf8b',
    CANCELED: '#5786b8',
    FINISHED: '#f7c873',
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProject(projectId)
      .then((data: ProjectItem) => setProjects([data]))
      .catch((error: any) => console.error('Error fetching projects:', error));
  }, []);
  console.log('projects', projects);

  const filteredProjects = useMemo(() => {
    const lowerBusca = search.toLowerCase();
    if (!search) return projects;
    if (!projects) return [];
    return projects.filter((project) =>
      project.name.toLowerCase().includes(lowerBusca)
    );
  }, [projects, search]);

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <DefaultMainLayout>
      <div className='projects'>
        <section className='projects_sidebar'>
          <h1>Itens</h1>
          <ProjectItems />
        </section>
        <section className='projects_content'>
          <h1 className='projects_title'>Projetos</h1>
          <div className='projects_header'>
            <Filter search={search} setSearch={setSearch} />
            <NewProjects />
          </div>
          <div className='projects_list'>
            {filteredProjects.map((project) => (
              <div key={project.id} className='project'>
                <div className='status'>
                  <div
                    className='project_status'
                    style={{ backgroundColor: colors[project.status] }}
                  ></div>
                </div>
                <div className='project_content'>
                  <div className='project_name'>{project.name}</div>
                  <div className='project_progress'>
                    <span style={{ fontWeight: 500 }}>Progresso: </span>
                    {project.progress}/{project.amount}
                  </div>
                  <div className='project_end_date'>
                    <span style={{ fontWeight: 500 }}>Prazo: </span>
                    {project.date}
                  </div>
                  <button
                    className='project_view_btn'
                    style={{
                      border: `1px solid ${colors[project.status]}`,
                      transition: 'background-color 0.3s, border-color 0.3s',
                    }}
                    onClick={() => openModal(project)}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        colors[project.status];
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor =
                        '#f6f4f6';
                    }}
                  >
                    Abrir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {selectedProject && (
        <div className='modal'>
          <div className='modal_content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedProject.name}</h2>
            <span>{selectedProject.description}</span>
            <span>
              <strong>Progresso:</strong> {selectedProject.progress}/
              {selectedProject.amount}
            </span>
            <span>
              <strong>Prazo:</strong> {selectedProject.date}
            </span>
            <span>
              <strong>Status:</strong> {selectedProject.status}
            </span>
          </div>
        </div>
      )}
    </DefaultMainLayout>
  );
}
