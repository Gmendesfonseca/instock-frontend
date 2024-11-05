import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './items.css';
import { Item } from '../../header-app/interfaces/Item';

export default function Items() {
  const items: Item[] = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
    quantity: Math.floor(Math.random() * 100),
    amount: Math.floor(Math.random() * 100),
    unit: 'kg',
  }));

  return (
    <DefaultMainLayout>
      <div className='container'>
        <div className='items_info'>
          <h3>Nome</h3>
          <h3>Compra (R$)</h3>
          <h3>Quantidade</h3>
          <h3>Medida</h3>
        </div>
        <div className='items'>
          {items.map((item) => (
            <div key={item.id} className='item'>
              <span>{item.name}</span>
              <span>{item.price}</span>
              <span>{item.quantity}</span>
              <span>{item.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </DefaultMainLayout>
  );
}
