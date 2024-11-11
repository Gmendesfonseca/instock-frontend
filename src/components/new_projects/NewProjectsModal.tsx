import React, { useState, useEffect, useRef } from 'react';
import './new_projects_modal.css';
import { createProject } from '@/services/projects/requests';
import { getProducts, Product } from '@/services/products/requests';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const clientRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    getProducts('658f7a87-22d1-4bda-a0cf-6b70921676ff')
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, []);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: (prevSelectedProducts[productId] || 0) + 1,
    }));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: quantity,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startDate = new Date();
      const formattedEndDate = formatDate(endDateRef.current?.value || '');
      const newProject = await createProject({
        company_id: '658f7a87-22d1-4bda-a0cf-6b70921676ff',
        name: nameRef.current?.value || '',
        description: descriptionRef.current?.value || '',
        client_name: clientRef.current?.value || '',
        status: 'ACTIVE',
        start_date: startDate.toISOString(),
        end_date: formattedEndDate,
        progress: 0,
        amount: 0,
        products: selectedProducts,
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
          <section className='left_side'>
            <div>
              <label>Nome do Projeto</label>
              <input type='text' ref={nameRef} required />
            </div>
            <div>
              <label>Descrição</label>
              <textarea ref={descriptionRef} required />
            </div>
            <div>
              <label>Nome do Cliente</label>
              <input type='text' ref={clientRef} required />
            </div>
          </section>
          <section className='right_side'>
            <div>
              <label>Prazo de Entrega</label>
              <input type='date' ref={endDateRef} required />
            </div>
            <div className='products'>
              <label htmlFor='products'>Produtos</label>
              <select id='products' onChange={handleProductSelect} required>
                <option value='' disabled>
                  Selecione um produto
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='selected_products'>
              {Object.keys(selectedProducts).map((productId) => {
                const product = products.find((p) => p.id === productId);
                return (
                  <div key={productId} className='selected_product'>
                    <span>{product.name}</span>
                    <input
                      type='number'
                      value={selectedProducts[productId]}
                      onChange={(e) =>
                        handleQuantityChange(
                          productId,
                          parseInt(e.target.value)
                        )
                      }
                      min='1'
                    />
                  </div>
                );
              })}
            </div>
          </section>
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
