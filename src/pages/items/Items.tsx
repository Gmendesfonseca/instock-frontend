import { useEffect } from 'react';
import { createSwapy } from 'swapy';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './items.css';

export default function Items() {
  useEffect(() => {
    const container = document.querySelector('.container');
    if (container) {
      const swapy = createSwapy(container, {
        animation: 'spring', // or spring or none
      });

      // You can disable and enable it anytime you want
      swapy.enable(true);

      swapy.onSwap((event) => {
        console.log(event.data.object);
        console.log(event.data.array);
        console.log(event.data.map);
      });
    }
  }, []);

  const items = Array.from({ length: 50 }, (_, index) => index);

  return (
    <DefaultMainLayout>
      <div className='container'>
        {items.map((item) => (
          <div className='section-1' data-swapy-slot={item}>
            <div key={item} className='item' data-swapy-item={item}>
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
                />
              </svg> */}
              {item}
            </div>
          </div>
        ))}
      </div>
    </DefaultMainLayout>
  );
}
