import { useEffect, useState } from 'react';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';

const RFID = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Replace 'localhost' with your server's address if needed
    const ws = new WebSocket('ws://localhost:3500');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // // Clean up the WebSocket connection when the component unmounts
    // return () => {
    //   ws.close();
    // };
  }, []);

  return (
    <DefaultMainLayout>
      <h1>RFID</h1>
      <p>{message}</p>
    </DefaultMainLayout>
  );
};

export default RFID;
