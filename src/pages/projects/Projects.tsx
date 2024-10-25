import React, { useEffect, useState } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './projects.css';
import Filter from '@/components/filter/Filter';

interface Project {
  id: number;
  name: string;
  status: 1 | 2 | 3;
  date: string;
  progress: number;
  amount: number;
  description: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/src/assets/projects.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const colors = {
    1: '#6fbf8b',
    2: '#5786b8',
    3: '#f7c873',
  };

  return (
    <DefaultMainLayout>
      <div className='projects'>
        <section className='projects_sidebar'>
          <h1>Itens</h1>
        </section>
        <section className='projects_content'>
          <h1 className='projects_title'>Projetos</h1>
          <Filter />
          <div className='projects_list'>
            {projects.map((project) => (
              <div key={project.id} className='project'>
                <div
                  className='project_status'
                  style={{ backgroundColor: colors[project.status] }}
                ></div>
                <div className='project_name'>{project.name}</div>
                <div className='project_progress'>
                  <span style={{ fontWeight: 500 }}>Progresso: </span>
                  {project.progress}/{project.amount}
                </div>
                <div className='project_end_date'>
                  <span style={{ fontWeight: 500 }}>Prazo: </span>
                  {project.date}
                </div>
                {/* <div className='project_description'>{project.description}</div> */}
                <button className='project_view_btn'>Abrir</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DefaultMainLayout>
  );
}
