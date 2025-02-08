import { useState, useEffect, useMemo } from 'react';
import DefaultMainLayout from '@/components/DefaultMainLayout';
import './items.css';
import { Product, getProducts } from '@/services/products';
import { useAuth } from '@/hooks/useAuth';
import RFIDModal from '@/components/RFID/RFIDModal';
import { createTag } from '@/services/tags';
import { useToast } from '@/hooks/useToast';

export default function Items() {
  const { user } = useAuth();
  const company_id = user.profile_id;
  const { addToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [search] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, [selectedProduct]);

  const filteredProducts = useMemo(() => {
    const lowerBusca = search.toLowerCase();
    if (!search) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(lowerBusca)
    );
  }, [products, search]);

  const handleRFIDReceived = async (rfid: string) => {
    try {
      const product = products.find((p) => p.tag?.rfid === rfid);
      if (!product) {
        createTag({
          rfid,
          company_id,
          product_id: selectedProduct?.id || '',
        });
        setSelectedProduct(null);
        addToast({
          type: 'success',
          description: 'Tag cadastrada com sucesso!',
        });
        closeModal();
      } else {
        addToast({
          type: 'error',
          description: 'Já existe um produto com essa tag!',
        });
      }
    } catch (error) {
      console.error('Error fetching tag:', error);
    }
  };

  const openModal = (product: Product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                {product.tag?.rfid ? (
                  <span>{product.tag.rfid}</span>
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
      />
    </DefaultMainLayout>
  );
}
