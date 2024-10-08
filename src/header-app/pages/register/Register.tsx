import './register.css';
import bg from '@/header-app/assets/bg.png';
import lock from '@/header-app/assets/lock.png';
import BtnSign from '@/header-app/components/signButton/BtnSign';
import { addToast } from '@/header-app/components/Toast/toast';
import { RegisterCredentials } from '@/header-app/contexts/AuthContext';
import { useAuth } from '@/header-app/hooks/useAuth';
import getValidationErrors from '@/header-app/utils/getValidationErrors';
import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

export default function Register() {
  const { registration } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: RegisterCredentials = {
        username: usernameRef.current?.value || '',
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        confirmPassword: confirmPasswordRef.current?.value || '',
      };

      try {
        const schema = Yup.object().shape({
          username: Yup.string().required('Nome de usuário obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória').min(8),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas devem ser iguais'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await registration({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });

        return window.location.replace('/login');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setErrors(errors);
          return;
        }

        if (err?.response?.status === 500) {
          return addToast(
            'Ocorreu um erro ao fazer login, por favor tente novamente.'
          );
        }

        if (err?.response?.status === 401) {
          return addToast('Credenciais inválidas, por favor tente novamente.');
        }

        addToast('E-mail ou senha incorretos.');
      }
    },
    [registration, addToast]
  );

  return (
    <div className='register'>
      <img src={bg} />
      <div className='content_register'>
        <img src={lock} />
        <h1>REGISTER</h1>
        <form className='form_register' id='form' onSubmit={handleSubmit}>
          <input
            data-cy='username'
            type='text'
            placeholder='Username'
            alt='username'
          />
          {errors.username && <span className='error'>{errors.username}</span>}
          <input
            data-cy='email'
            type='text'
            placeholder='E-mail'
            alt='e-mail'
          />
          {errors.email && <span className='error'>{errors.email}</span>}
          <input
            data-cy='password'
            type='password'
            placeholder='Password'
            alt='password'
          />
          {errors.password && <span className='error'>{errors.password}</span>}
          <input
            data-cy='confirm_password'
            type='password'
            placeholder='Confirm Password'
            alt='confirm password'
          />
          {errors.confirmPassword && (
            <span className='error'>{errors.confirmPassword}</span>
          )}
          <a href='/' data-cy='navigate_login' className='navigate_login'>
            Fazer login
          </a>
        </form>
        <BtnSign title='Registrar-se' />
      </div>
    </div>
  );
}
