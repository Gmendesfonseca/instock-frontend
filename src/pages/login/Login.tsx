import './login.css';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useQuery } from '@/header-app/hooks/useQuery';
import { SignInCredentials } from '@/header-app/contexts/AuthContext';
import * as Yup from 'yup';
import { useAuth } from '@/header-app/hooks/useAuth';
import getValidationErrors from '@/header-app/utils/getValidationErrors';
import { useToast } from '@/header-app/hooks/toast';
import bg from '../../../public/bg.png';
import lock from '../../../public/lock.png';

export default function Login() {
  const query = useQuery();
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const routeToRedirect = useMemo(() => {
    const url = query.get('redirect_to');

    if (url) {
      const rule = /[h][t]{2}[p]s?[:][/]{2}/;
      const protocol = 'http';
      const urlToRedirect = `${protocol}://${url.replace(rule, '')}`;
      return urlToRedirect;
    }

    return '/home';
  }, []); // eslint-disable-line

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: SignInCredentials = {
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
      };

      console.log('Form data:', data);

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        return window.location.replace(routeToRedirect);
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setErrors(errors);
          return;
        }

        if (err?.response?.status === 500) {
          return addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Ocorreu um erro ao fazer login, por favor tente novamente.',
          });
        }

        if (err?.response?.status === 401) {
          return addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Credenciais inválidas, por favor tente novamente.',
          });
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'E-mail ou senha incorretos.',
        });
      }
    },
    [signIn, addToast] // eslint-disable-line
  );

  return (
    <div className='login'>
      <img src={bg} />
      <div className='content_login'>
        <img src={lock} />
        <h1>LOGIN</h1>
        <form className='form_login' id='form' onSubmit={handleSubmit}>
          <input
            data-cy='email'
            type='text'
            placeholder='E-mail'
            alt='e-mail'
            ref={emailRef}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
          <input
            data-cy='password'
            type='password'
            placeholder='Password'
            alt='password'
            ref={passwordRef}
          />
          {errors.password && <span className='error'>{errors.password}</span>}
          <a
            href='/register'
            data-cy='navigate_register'
            className='navigate_register'
          >
            Criar nova conta
          </a>
          <button data-cy='login_submit' className='sign_in' type='submit'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
