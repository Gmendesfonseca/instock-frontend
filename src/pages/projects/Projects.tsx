import React, { useEffect, useState } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './projects.css';

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
    1: '#5786b8',
    2: '#6fbf8b',
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
          <div className='projects_list'>
            {projects.map((project) => (
              <div key={project.id} className='project'>
                <div
                  className='project_status'
                  style={{ backgroundColor: colors[project.status] }}
                ></div>
                <div className='project_name'>{project.name}</div>
                <div className='project_progress'>
                  {project.progress}/{project.amount}
                </div>
                <div className='project_end_date'>{project.date}</div>
                <div className='project_description'>{project.description}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DefaultMainLayout>
  );
}
