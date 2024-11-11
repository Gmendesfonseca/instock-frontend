import './navbar.css';
import { AxiosInstance } from 'axios';
import { MeProps } from '../../interfaces/Me';
import { IUser } from '../../interfaces/User';
import { HeaderProvider } from '@/header-app/contexts/HeaderContext';
import { Product, getProducts } from '@/services/products';
import { useState, useEffect } from 'react';
import RFIDModal from '@/components/RFID/RFIDModal';
import { useToast } from '@/header-app/hooks/useToast';

// import NotificationSocketProvider from '@/header-app/contexts/NotificationSocketContext';

interface props {
  user: IUser;
  me: MeProps;
  api: AxiosInstance;
  signOut: Function;
}

const Navbar: React.FC<React.PropsWithChildren<props>> = ({
  user,
  me,
  api,
  signOut,
}) => {
  const { addToast } = useToast();

  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProducts(company_id)
      .then((data: Product[]) => setProducts(data))
      .catch((error: any) => console.error('Error fetching products:', error));
  }, [isModalOpen]);

  const handleRFIDReceived = async (rfid: string) => {
    try {
      const product = products.find((p) => p.tag?.rfid === rfid);
      if (product) {
        setModalProduct(product);
        addToast({
          type: 'success',
          description: 'Produto encontrado!',
        });
      } else {
        addToast({
          type: 'error',
          description: 'Produto não encontrado!',
        });
      }
    } catch (error) {
      console.error('Error fetching tag:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };

  const company_id = '658f7a87-22d1-4bda-a0cf-6b70921676ff';

  return (
    <HeaderProvider
      value={{
        user,
        profiles: me,
        api,
        signOut,
      }}
    >
      {/* <NotificationSocketProvider api={api} user={user}> */}
      <nav className='nav'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='menu_list'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>

        <ul className='nav_list'>
          <div className='nav_left'>
            <li className='nav_item'>
              <a href='/projects' className='nav_link'>
                Projetos
              </a>
            </li>
            <li className='nav_item'>
              <a href='/items' className='nav_link'>
                Itens
              </a>
            </li>
            <li className='nav_item'>
              <a href='/item_register' className='nav_link'>
                Cadastrar
              </a>
            </li>
            <li className='nav_item'>
              <span className='nav_link'>Vendas</span>
            </li>
          </div>
          <div className='nav_right'>
            <li className='nav_item'>
              <button onClick={() => openModal()} className='nav_link'>
                Ler RFID
              </button>
            </li>
            <li className='nav_item'>
              {/* substituir span */}
              <span className='nav_link'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='nav_icon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </span>
            </li>
            <li className='nav_item'>
              <a href='/' className='nav_link'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='nav_icon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
              </a>
            </li>
            <li className='nav_item'>
              <a href='/' className='nav_link' onClick={() => signOut()}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='nav_icon'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
                  />
                </svg>
              </a>
            </li>
          </div>
        </ul>
      </nav>
      <RFIDModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRFIDReceived={handleRFIDReceived}
        product={modalProduct}
      />
      {/* </NotificationSocketProvider> */}
    </HeaderProvider>
  );
};

export default Navbar;
