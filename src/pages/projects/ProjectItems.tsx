import { Item } from '../../header-app/interfaces/Item';
import './project_items.css';

export default function ProjectItems() {
  const items: Item[] = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
    quantity: Math.floor(Math.random() * 100),
    amount: Math.floor(Math.random() * 100),
    unit: 'kg',
  }));

  return (
    <div className='project_items'>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
