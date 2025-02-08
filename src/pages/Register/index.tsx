import './register.css';
import bg from '@/assets/bg.png';
import lock from '@/assets/lock.png';
import BtnSign from '@/components/SignButton/BtnSign';
import { RegisterCredentials } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import getValidationErrors from '@/utils/getValidationErrors';
import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

export default function Register() {
  const { addToast } = useToast();
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
        type: 'COMPANY',
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
          type: data.type,
        });

        addToast({
          type: 'success',
          description: 'Cadastro realizado com sucesso!',
        });

        return window.location.replace('/');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setErrors(errors);
          return;
        }

        if (err?.response?.status === 500) {
          return addToast({
            type: 'error',
            description:
              'Ocorreu um erro ao fazer login, por favor tente novamente.',
          });
        }

        if (err?.response?.status === 401) {
          return addToast({
            type: 'error',
            description: 'Credenciais inválidas, por favor tente novamente.',
          });
        }

        addToast({
          type: 'error',
          description: 'E-mail ou senha incorretos.',
        });
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
            ref={usernameRef}
            data-cy='username'
            type='text'
            placeholder='Username'
            alt='username'
          />
          {errors.username && <span className='error'>{errors.username}</span>}
          <input
            ref={emailRef}
            data-cy='email'
            type='text'
            placeholder='E-mail'
            alt='e-mail'
          />
          {errors.email && <span className='error'>{errors.email}</span>}
          <input
            ref={passwordRef}
            data-cy='password'
            type='password'
            placeholder='Password'
            alt='password'
          />
          {errors.password && <span className='error'>{errors.password}</span>}
          <input
            ref={confirmPasswordRef}
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
          <BtnSign title='Registrar-se' />
        </form>
      </div>
    </div>
  );
}
