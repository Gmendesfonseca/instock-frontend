import './register.css';
import { useNavigate } from 'react-router-dom';
import bg from '../../../public/bg.png';
import lock from '../../../public/lock.png';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className='register'>
      <img src={bg} />
      <div className='content_register'>
        <img src={lock} />
        <h1>Register</h1>
        <form className='form_register' id='form'>
          <input
            data-cy='username'
            type='text'
            placeholder='Username'
            alt='username'
          />
          <input
            data-cy='email'
            type='text'
            placeholder='E-mail'
            alt='e-mail'
          />

          <input
            data-cy='password'
            type='password'
            placeholder='Password'
            alt='password'
          />

          <input
            data-cy='confirm_password'
            type='password'
            placeholder='Confirm Password'
            alt='confirm password'
          />

          <a href='/' data-cy='navigate_login' className='navigate_login'>
            Fazer login
          </a>
        </form>
        <button className='sign_up' onClick={() => navigate('/')}>
          Registrar
        </button>
      </div>
    </div>
  );
}
