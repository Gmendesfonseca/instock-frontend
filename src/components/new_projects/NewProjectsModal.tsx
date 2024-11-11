import React, { useState, useEffect, useRef } from 'react';
import './new_projects_modal.css';
import { createProject } from '@/services/projects/requests';
import { getProducts } from '@/services/products/requests';
import { NewItens } from '@/services/projects';
import { Product } from '@/services/products';
import { useAuth } from '@/header-app/hooks/useAuth';

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
  const { user } = useAuth();
  const company_id = user.profile_id;
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const clientRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<{
    [key: string]: number;
  }>({});
  const [items, setItems] = useState<NewItens[]>([]);

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSelectedProduct('');
      setSelectedProducts({});
      setItems([]);
    }
  }, [isOpen]);

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
    setSelectedProduct(''); // Reset the select value to empty
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: quantity,
    }));
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item.product_id === productId
      );
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].amount = quantity;
        return updatedItems;
      } else {
        return [...prevItems, { product_id: productId, amount: quantity }];
      }
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prevSelectedProducts) => {
      const { [productId]: _, ...rest } = prevSelectedProducts;
      return rest;
    });
    setItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startDate = new Date();
      const formattedEndDate = formatDate(endDateRef.current?.value || '');
      const newProject = await createProject({
        data: {
          company_id: '658f7a87-22d1-4bda-a0cf-6b70921676ff',
          name: nameRef.current?.value || '',
          description: descriptionRef.current?.value || '',
          client_name: clientRef.current?.value || '',
          status: 'ACTIVE',
          start_date: startDate.toISOString(),
          end_date: formattedEndDate,
          progress: 0,
          amount: 0,
        },
        items: items,
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
        <section className='modal_header'>
          <span className='close' onClick={onClose}>
            &times;
          </span>
          <h2>Novo Projeto</h2>
        </section>
        <form onSubmit={handleSubmit}>
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
            <input type='text' ref={clientRef} />
          </div>
          <div>
            <label>Prazo de Entrega</label>
            <input type='date' ref={endDateRef} required />
          </div>
          <div className='products'>
            <label htmlFor='products'>Produtos</label>
            <select
              id='products'
              value={selectedProduct}
              onChange={handleProductSelect}
              required
            >
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
                  <span>{product?.name}</span>
                  <div className='product_quantity'>
                    <input
                      type='number'
                      value={selectedProducts[productId]}
                      onChange={(e) => {
                        const amount = parseInt(e.target.value);
                        handleQuantityChange(productId, amount);
                      }}
                      min='1'
                    />
                    <button
                      className='remove_product_btn'
                      type='button'
                      onClick={() => handleRemoveProduct(productId)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button type='submit' className='submit_btn'>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
