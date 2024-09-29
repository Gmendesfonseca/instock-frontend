import { AxiosInstance } from 'axios';
import { MeProps } from '../../header-app/interfaces/Me';
import { IUser } from '../../interfaces/User';
import './navbar.css';

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
  );
};

export default Navbar;
