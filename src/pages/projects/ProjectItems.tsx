import { useEffect, useState } from 'react';
import { Item } from '../../header-app/interfaces/Item';
import './project_items.css';
import { getProducts, Product } from '@/services/products';
import { useAuth } from '@/header-app/hooks/useAuth';

const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

export default function ProjectItems() {
  const user = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, []);
  console.log('products', products);

  return (
    <div className='project_items'>
      {products.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <span>{product.quantity}</span>
        </div>
      ))}
    </div>
  );
}
