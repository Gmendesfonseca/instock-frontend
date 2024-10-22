import React, { useEffect, useState } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './projects.css';

interface Project {
  id: number;
  name: string;
  status: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/src/assets/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case '1':
        return 'project_status_green';
      case '2':
        return 'project_status_orange';
      case '3':
        return 'project_status_blue';
      default:
        return '';
    }
  };

  return (
    <DefaultMainLayout>
      <div className='projects'>
        <section className='projects_sidebar'>
          <h1>Itens</h1>
        </section>
        <section className='projects_content'>
          <h1 className='projects_title'>Projetos</h1>
          <div className='projects_list'>
            {projects.map((project) => (
              <div key={project.id} className='project'>
                <div className='project_header'>
                  <div className='project_name'>{project.name}</div>
                  <div
                    className={`project_status ${getStatusClass(
                      project.status
                    )}`}
                  ></div>
                </div>
                <div className='project_body'>
                  <div className='project_end_date'>DD/MM/AAAA</div>
                  <div className='project_progress'>14/50</div>
                  <div className='project_description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec nec odio vitae
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DefaultMainLayout>
  );
}
