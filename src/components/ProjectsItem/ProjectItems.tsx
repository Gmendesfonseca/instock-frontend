import './project_items.css';
import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/services/products';
import { useAuth } from '@/hooks/useAuth';

export default function ProjectItems() {
  const { user } = useAuth();
  const company_id = user.profile_id;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, []);

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
