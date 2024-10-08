import './navbar.css';
import { AxiosInstance } from 'axios';
import { MeProps } from '../../interfaces/Me';
import { IUser } from '../../interfaces/User';
import { HeaderProvider } from '@/header-app/contexts/HeaderContext';
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
        <ul className='nav_list'>
          <li className='nav_item'>
            <a href='#' className='nav_link'>
              Home
            </a>
          </li>
          <li className='nav_item'>
            <a href='#' className='nav_link'>
              About
            </a>
          </li>
          <li className='nav_item'>
            <a href='#' className='nav_link'>
              Contact
            </a>
          </li>
          <li className='nav_item'>
            <button>
              <a href='/' className='nav_link' onClick={() => signOut()}>
                Logout
              </a>
            </button>
          </li>
        </ul>
      </nav>
      {/* </NotificationSocketProvider> */}
    </HeaderProvider>
  );
};

export default Navbar;
