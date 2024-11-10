import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './items.css';
import { Item } from '../../header-app/interfaces/Item';
import { useAuth } from '@/header-app/hooks/useAuth';
import { useState, useEffect, useMemo } from 'react';
import { getProducts, Product } from '@/services/products';

const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

export default function Items() {
  const user = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, []);
  console.log('products', products);

  const filteredProducts = useMemo(() => {
    const lowerBusca = search.toLowerCase();
    if (!search) return products;
    if (!Items) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowerBusca)
    );
  }, [products, search]);

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
          {products.map((product) => (
            <div key={product.id} className='item'>
              <span>{product.name}</span>
              <span>{product.purchase_price}</span>
              <span>{product.quantity}</span>
              <span>{product.unit_measurement}</span>
            </div>
          ))}
        </div>
      </div>
    </DefaultMainLayout>
  );
}
