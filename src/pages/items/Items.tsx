import React, { useState, useEffect, useMemo } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './items.css';
import { Product, getProducts } from '@/services/products';
import { useAuth } from '@/header-app/hooks/useAuth';
import RFIDModal from '@/components/RFID/RFIDModal';
import { createTag, getTag } from '@/services/tags';

const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

export default function Items() {
  const user = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = useMemo(() => {
    const lowerBusca = search.toLowerCase();
    if (!search) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowerBusca)
    );
  }, [products, search]);

  const handleRFIDReceived = async (rfid: string) => {
    try {
      const tag = await getTag(rfid);
      const product = products.find((p) => p.id === tag.product_id);
      if (product) {
        setModalProduct(product);
      } else {
        createTag({
          company_id,
          rfid,
          product_id: selectedProduct?.id || '',
        });
      }
    } catch (error) {
      console.error('Error fetching tag:', error);
    } finally {
      setIsModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalProduct(null);
  };

  return (
    <DefaultMainLayout>
      <div className='container'>
        <div className='items_info'>
          <h3>Nome</h3>
          <h3>Compra (R$)</h3>
          <h3>Quantidade</h3>
          <h3>Medida</h3>
          <h3>RFID</h3>
        </div>
        <div className='items'>
          {filteredProducts.map((product) => (
            <div key={product.id} className='item'>
              <span>{product.name}</span>
              <span>{product.purchase_price}</span>
              <span>{product.quantity}</span>
              <span>{product.unit_measurement}</span>
              <div className='div_btn'>
                {product.rfid ? (
                  <span>{product.rfid}</span>
                ) : (
                  <button
                    className='rfid_btn'
                    onClick={() => openModal(product)}
                  >
                    Adicionar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <RFIDModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRFIDReceived={handleRFIDReceived}
        product={modalProduct}
      />
    </DefaultMainLayout>
  );
}
