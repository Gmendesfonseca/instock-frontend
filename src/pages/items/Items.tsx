import { useEffect } from 'react';
import { createSwapy } from 'swapy';
import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './items.css';

export default function Items() {
  useEffect(() => {
    const container = document.querySelector('.container');
    if (container) {
      const swapy = createSwapy(container, {
        animation: 'dynamic', // or spring or none
      });

      // You can disable and enable it anytime you want
      swapy.enable(true);

      swapy.onSwap((event) => {
        console.log(event.data.object);

        event.data.object = {
          foo: 'a',
          bar: 'b',
          baz: 'c',
        };
      });

      return () => {
        swapy.destroy();
      };
    }
  }, []);

  return (
    <DefaultMainLayout>
      <div className='container'>
        <div className='section-1' data-swapy-slot='foo'>
          <div className='content-a' data-swapy-item='a'>
            A
          </div>
        </div>

        <div className='section-2' data-swapy-slot='bar'>
          <div className='content-b' data-swapy-item='b'>
            B
          </div>
        </div>

        <div className='section-3' data-swapy-slot='baz'>
          <div className='content-c' data-swapy-item='c'>
            C
          </div>
        </div>
      </div>
    </DefaultMainLayout>
  );
}
