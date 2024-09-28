import { Navigate, useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className='login'>
      <div className='content_login'>
        <h1>Login</h1>
        <form className='form_login' id='form'>
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
          <a
            href='/register'
            data-cy='navigate_register'
            className='navigate_register'
          >
            Criar nova conta
          </a>
          <button
            data-cy='login_submit'
            className='sign_in'
            type='submit'
            onClick={() => navigate('/home')}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
