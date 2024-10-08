import './login.css';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useQuery } from '@/header-app/hooks/useQuery';
import { SignInCredentials } from '@/header-app/contexts/AuthContext';
import * as Yup from 'yup';
import { useAuth } from '@/header-app/hooks/useAuth';
import getValidationErrors from '@/header-app/utils/getValidationErrors';
import bg from '@/header-app/assets/bg.png';
import lock from '@/header-app/assets/lock.png';
import { addToast } from '@/header-app/components/Toast/toast';
import BtnSign from '../../components//signButton/BtnSign';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const query = useQuery();
  const { signIn } = useAuth();
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
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: SignInCredentials = {
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
      };

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória').min(8),
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
    [signIn, addToast]
  );

  const { t } = useTranslation();

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
            {t('sign.create_new_account')}
          </a>
          <BtnSign title='Login' />
        </form>
      </div>
    </div>
  );
}
