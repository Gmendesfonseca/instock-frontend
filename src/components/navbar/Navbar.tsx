import './navbar.css';

export default function Navbar() {
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
      </ul>
    </nav>
  );
}
