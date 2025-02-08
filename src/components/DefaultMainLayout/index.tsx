import './styles.css';
import { FC, PropsWithChildren } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfileContext } from '../../contexts/ProfileContext';
import Navbar from '@/components/Navbar/Navbar';
import api from '@/services/api';

const DefaultMainLayout: FC<
  PropsWithChildren<{
    withoutSideBar?: boolean;
  }>
> = ({ children }) => {
  const { me } = useProfileContext();
  const { user, signOut } = useAuth();

  return (
    <>
      {me && <Navbar api={api} me={me} user={user} signOut={signOut} />}
      <div className='container__main'>
        <div className='container__main__content'>
          <div className='container__main'>
            <div className='container__main__content'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultMainLayout;
