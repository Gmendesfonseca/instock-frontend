import React from 'react';
import { useTransition } from 'react-spring';

import Toast from '../Toast';

import { Container } from './styles';

import { ToastMessage } from '../../hooks/useToast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<
  React.PropsWithChildren<ToastContainerProps>
> = ({ messages }: ToastContainerProps) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
