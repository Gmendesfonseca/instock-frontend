import './styles.css';
import { FC, PropsWithChildren } from 'react';
import { useAuth } from '@/header-app/hooks/useAuth';
import { useProfileContext } from '../../contexts/ProfileContext';
import Navbar from '@/header-app/components/Navbar/Navbar';
import api from '@/services/api';

const DefaultMainLayout: FC<
  PropsWithChildren<{
    withoutSideBar?: boolean;
  }>
> = ({ children }) => {
  const { user, signOut } = useAuth();

  const { me } = useProfileContext();

  return (
    <>
      {me && <Navbar api={api} me={me} user={user} signOut={signOut} />}
      <div
        className='container__main'
        // style={{
        //   display: 'flex',
        //   flexDirection: 'row',
        //   gap: '1rem',
        //   width: '100%',
        //   height: 'calc(100% - 55px)',
        //   position: 'relative',
        // }}
      >
        <div
          className='container__main__content'
          // style={{
          //   display: 'flex',
          //   flexDirection: 'column',
          //   width: '100%',
          //   height: '100%',
          //   overflow: 'auto',
          // }}
        >
          <div
            className='container__main'
            // style={{
            //   display: 'flex',
            //   flexDirection: 'row',
            //   gap: '1rem',
            //   width: '100%',
            //   height: 'calc(100% - 55px)',
            //   position: 'relative',
            // }}
          >
            <div
              className='container__main__content'
              // style={{
              //   display: 'flex',
              //   flexDirection: 'column',
              //   width: '100%',
              //   height: '100%',
              //   overflow: 'auto',
              // }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultMainLayout;
