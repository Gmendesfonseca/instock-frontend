import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './items.css';

interface Item {
  id: number;
  name: string;
  amount: number;
}

export default function Items() {
  const items: Item[] = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    name: `Item ${index}`,
    date: new Date().toLocaleDateString(),
    amount: Math.floor(Math.random() * 100),
  }));

  return (
    <DefaultMainLayout>
      <div className='container'>
        <div className='items_info'>
          <h3>Nome</h3>
          <h3>Quantidade</h3>
        </div>
      </div>
    </DefaultMainLayout>
  );
}
