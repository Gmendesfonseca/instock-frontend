// src/components/RFIDModal.tsx
import React, { useEffect, useState } from 'react';
import './rfid_modal.css';

interface RFIDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRFIDReceived: (rfid: string) => void;
}

const RFIDModal: React.FC<RFIDModalProps> = ({
  isOpen,
  onClose,
  onRFIDReceived,
}) => {
  const [rfid, setRFID] = useState('');

  useEffect(() => {
    if (isOpen) {
      const ws = new WebSocket('ws://localhost:3500');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          setRFID(data);
          onRFIDReceived(data);
          onClose();
        }
      };
      return () => {
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
        <h2>Aguardando RFID...</h2>
        <p>
          {rfid ? `RFID Recebido: ${rfid}` : 'Aguardando leitura do RFID...'}
        </p>
      </div>
    </div>
  );
};

export default RFIDModal;
