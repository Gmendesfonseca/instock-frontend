import { useState } from 'react';
import './new_projects.css';
import NewProjectModal from './NewProjectsModal';
import { useToast } from '@/hooks/useToast';

export default function NewProjects() {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (project: { name: string; description: string }) => {
    addToast({
      type: 'success',
      description: 'Projeto criado com sucesso!',
    });
    window.location.reload();
    console.log('New project submitted:', project);
    // Add your logic to handle the new project submission
  };

  return (
    <div>
      <button className='new_projects_btn' onClick={handleOpenModal}>
        Novo Projeto
      </button>
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
