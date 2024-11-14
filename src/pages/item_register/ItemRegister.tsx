import React, { useRef } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './item_register.css';
import { createProduct } from '@/services/products/requests';
import { UnitMeasurement } from '@/services/products/types';
import { useToast } from '@/header-app/hooks/useToast';
import { useAuth } from '@/header-app/hooks/useAuth';

export default function ItemRegister() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const company_id = user.profile_id;
  const nameRef = useRef<HTMLInputElement>(null);
  const purchasePriceRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const measurementOptions = [
    {
      text: 'KG',
      value: UnitMeasurement.KILOGRAM,
    },
    {
      text: 'L',
      value: UnitMeasurement.LITER,
    },
    {
      text: 'UNIT',
      value: UnitMeasurement.UNIT,
    },
  ];

  // const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newItem = await createProduct({
        name: nameRef?.current?.value || '',
        purchase_price: parseFloat(purchasePriceRef?.current?.value || ''),
        quantity: parseInt(quantityRef?.current?.value || ''),
        unit_measurement: unitRef?.current?.value || '',
        description: descriptionRef?.current?.value || '',
        company_id: company_id,
      });
      addToast({
        type: 'success',
        description: 'Item criado com sucesso!',
      });
      window.location.replace('/items');
      console.log('Item created:', newItem);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <DefaultMainLayout>
      <div className='item_register'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Cadastrar Item</h1>
          <div>
            <label htmlFor='name'>Nome do Item</label>
            <input type='text' id='name' required ref={nameRef} />
          </div>
          <div>
            <label htmlFor='price'>Preço de Compra</label>
            <input type='number' id='price' ref={purchasePriceRef} required />
          </div>
          <div>
            <label htmlFor='quantity'>Quantidade</label>
            <input type='number' id='quantity' ref={quantityRef} required />
          </div>
          <div>
            <label htmlFor='unit'>Medida</label>
            <select ref={unitRef}>
              {measurementOptions.map((unit) => (
                <option value={unit.value}>{unit.text}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='description'>Descrição</label>
            <textarea id='description' ref={descriptionRef} required />
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </DefaultMainLayout>
  );
}
