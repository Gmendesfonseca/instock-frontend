import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/useToast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<React.PropsWithChildren<ToastProps>> = ({
  message,
  style,
}: ToastProps) => {
  const { removeToast } = useToast();

  const hasDescription = () => {
    return !!message.description;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type || 'info'}
      description={message.description ? message.description : ''}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        <p hidden={!hasDescription()}>{message.description}</p>
      </div>

      <button
        aria-label='Fechar'
        onClick={() => removeToast(message.id)}
        type='button'
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
