import React, { useState } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './item_register.css';
import { createProduct } from '@/services/products/requests';
import { UnitMeasurement } from '@/services/products/types';

export default function ItemRegister() {
  const [name, setName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState(UnitMeasurement.KILOGRAM);
  const [description, setDescription] = useState('');

  const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newItem = await createProduct({
        name,
        purchase_price: parseFloat(purchasePrice),
        quantity: parseInt(quantity),
        unit,
        description,
        company_id: company_id,
      });
      console.log('Item created:', newItem);
      setName('');
      setPurchasePrice('');
      setQuantity('');
      setUnitMeasurement('');
      setDescription('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <DefaultMainLayout>
      <div className='item_register'>
        <h1>Cadastrar Item</h1>
        <form className='form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Nome do Item</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='price'>Preço de Compra</label>
            <input
              type='number'
              id='price'
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='quantity'>Quantidade</label>
            <input
              type='number'
              id='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='unit'>Medida</label>
            <select onChange={(e) => setUnitMeasurement(e.target.value)}>
              {Object.values(UnitMeasurement).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='description'>Descrição</label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </DefaultMainLayout>
  );
}
