import React, { useState } from 'react';
import './new_projects_modal.css';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: {
    name: string;
    description: string;
    status: string;
  }) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
    onClose();
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
          <div className='status'>
            <label>Status</label>
            <select
              className='status_select'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value='' disabled>
                Status do Projeto
              </option>
              <option value='1'>Em Planejamento</option>
              <option value='2'>Em Andamento</option>
              <option value='3'>Finalizado</option>
            </select>
          </div>
          <div>
            <label>Prazo de Entrega</label>
            <input type='date' />
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
