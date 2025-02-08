import { useState, useEffect, useMemo } from 'react';
import DefaultMainLayout from '@/components/DefaultMainLayout';
import './projects.css';
import Filter from '@/components/Filter/Filter';
import NewProjects from '@/components/NewProjects/NewProjects';
import { getProjectsByCompany, ProjectItem } from '@/services/projects';
import ProjectItems from '../../components/ProjectsItem/ProjectItems';
import { useAuth } from '@/hooks/useAuth';

export default function Projects() {
  const { user } = useAuth();
  const company_id = user.profile_id;
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
    getProjectsByCompany(company_id)
      .then((data: ProjectItem[]) => setProjects(data))
      .catch((error: any) => console.error('Error fetching projects:', error));
  }, []);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
                  />
                </div>
                <div className='project_content'>
                  <div className='project_name'>{project.name}</div>
                  <div className='project_progress'>
                    <span style={{ fontWeight: 500 }}>Quantidade: </span>
                    {project.products.length}
                  </div>
                  <div className='project_end_date'>
                    <span style={{ fontWeight: 500 }}>Prazo: </span>
                    {formatDate(project.end_date)}
                  </div>
                  <div className='project_btn_div'>
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
              </div>
            ))}
          </div>
        </section>
      </div>
      {selectedProject && (
        <div className='modal'>
          <div className='modal_content'>
            <div className='project_modal_header'>
              <div onClick={closeModal} className='close_btn'>
                &times;
              </div>
              <div className='modal_project_title'>
                <h2>{selectedProject.name}</h2>
              </div>
            </div>
            <span>
              <strong>Status: </strong> {selectedProject.status}
            </span>
            {selectedProject.client_name && (
              <span>
                <strong>Cliente: </strong> {selectedProject.client_name}
              </span>
            )}
            {selectedProject.products &&
              selectedProject.products.map((product) => (
                <>
                  <span key={product.id} className='project_modal_description'>
                    <div>
                      <strong>Produto: </strong>
                    </div>
                    <div>{product.name}</div>
                    <strong>Quantidade: </strong>
                    <div>{product.pivot?.amount}</div>
                  </span>
                </>
              ))}
            <span>
              <strong>Prazo: </strong> {formatDate(selectedProject.end_date)}
            </span>
            <span>
              <strong>Descrição: </strong> {selectedProject.description}
            </span>
          </div>
        </div>
      )}
    </DefaultMainLayout>
  );
}
