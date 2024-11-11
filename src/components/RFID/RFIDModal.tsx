// src/components/RFIDModal.tsx
import React, { useEffect, useState } from 'react';
import './rfid_modal.css';
import { Product } from '@/services/products';

interface RFIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRFIDReceived: (rfid: string) => void;
  product?: Product | null;
}

const RFIDModal: React.FC<RFIDModalProps> = ({
  isOpen,
  onClose,
  onRFIDReceived,
  product,
}) => {
  const [rfid, setRFID] = useState('');

  useEffect(() => {
    if (isOpen) {
      const ws = new WebSocket('ws://localhost:3500');
      ws.onmessage = (event) => {
        setRFID(event.data);
        onRFIDReceived(event.data);
        onClose();
      };
      return () => {
        setRFID('');
        ws.close();
      };
    }
  }, [isOpen, onClose, onRFIDReceived]);

  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal_content'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>{product ? 'Produto Encontrado' : 'Aguardando RFID...'}</h2>
        {product ? (
          <div>
            <p>
              <strong>Nome:</strong> {product.name}
            </p>
            <p>
              <strong>Preço de Compra:</strong> {product.purchase_price}
            </p>
            <p>
              <strong>Quantidade:</strong> {product.quantity}
            </p>
            <p>
              <strong>Medida:</strong> {product.unit_measurement}
            </p>
            <p>
              <strong>RFID:</strong>
              {rfid}
            </p>
          </div>
        ) : (
          <p>
            {rfid ? `RFID Recebido: ${rfid}` : 'Aguardando leitura do RFID...'}
          </p>
        )}
      </div>
    </div>
  );
};

export default RFIDModal;
