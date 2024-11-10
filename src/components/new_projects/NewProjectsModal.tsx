import React, { useState } from 'react';
import './new_projects_modal.css';
import { NewProject } from '../../services/projects/types';
import { createProject } from '../../services/projects/requests';

const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: NewProject) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startDate = new Date();
      const formattedEndDate = formatDate(endDate);
      const newProject = await createProject({
        company_id: company_id,
        name,
        description,
        status: 'ACTIVE',
        start_date: new Date().toISOString(),
        end_date: formattedEndDate,
        progress: 0,
        amount: 0,
      });
      onSubmit(newProject);
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className='modal'>
      <div className='modal_content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>Novo Projeto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome do Projeto</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nome do Cliente</label>
            <input
              type='text'
              value={client}
              onChange={(e) => setClient(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Prazo de Entrega</label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
