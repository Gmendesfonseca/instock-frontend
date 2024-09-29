import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// Data
import { api } from '../../services/api';

// interfaces
import { AxiosResponse } from 'axios';
import { SetState } from '../interfaces/SetState';
import { MeProps } from '../interfaces/Me';

export interface ProfileContextProps {
  me: MeProps;
  setMe: SetState<MeProps>;
  getMe: () => Promise<MeProps>;
}

const ProfileContext = createContext<ProfileContextProps>({} as any);

const ProfileContextProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [me, setMe] = useState<MeProps>({} as MeProps);

  const getMe = useCallback(async () => {
    const response: AxiosResponse<MeProps> = await api.get(`/me`);
    return response.data;
  }, []);

  useEffect(() => {
    getMe().then((data) => setMe(data));
  }, [getMe]);

  return (
    /* eslint-disable */
    <ProfileContext.Provider
      value={{
        me,
        setMe,
        getMe,
      }}
    >
      {children}
    </ProfileContext.Provider>
    /* eslint-enable */
  );
};

export function useProfileContext(): ProfileContextProps {
  return useContext(ProfileContext);
}

export default ProfileContextProvider;
