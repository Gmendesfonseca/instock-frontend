import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AxiosInstance } from 'axios';

import { decode } from '@/header-app/utils/crypto';
import { TokenData } from '@/header-app/interfaces/TokenData';

export interface InterceptorDependencies {
  signOut: () => void;
  refreshToken: () => Promise<string | null>;
  companyId?: string;
  companyIdExceptions?: string[];
}

export function createInterceptor(
  api: AxiosInstance,
  dependencies: InterceptorDependencies
) {
  const { signOut, refreshToken, companyId, companyIdExceptions } =
    dependencies;

  const interceptRequest = () => {
    api.interceptors.request.use(async (request) => {
      const hasRefreshToken = request?.url?.includes('refresh-token');
      const isCompanyIdException = companyIdExceptions?.includes(
        request.url || ''
      );

      if (hasRefreshToken) return request;

      let token = Cookies.get('authToken');
      let isTokenExpiredOrAboutToExpire = false;

      if (token) {
        try {
          const decodedToken = decode(token);
          const decryptedToken = jwtDecode<TokenData>(decodedToken);
          const unixExpirationTimestamp = +new Date(decryptedToken.exp * 1000);
          const unixCurrentTimestamp = +new Date();

          token = decodedToken;
          isTokenExpiredOrAboutToExpire =
            unixExpirationTimestamp - unixCurrentTimestamp <= 10;
        } catch {
          signOut();
        }
      }

      if (!token || isTokenExpiredOrAboutToExpire) {
        token = (await refreshToken()) || undefined;
      }

      const settings = {
        ...request,
        headers: {
          ...request.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(companyId && !isCompanyIdException && { companyId }),
        },
      };

      return settings as any;
    });
  };

  const interceptResponse = () => {
    api.interceptors.response.use((response) => {
      const tokenFounded = Boolean(Cookies.get('authToken'));
      const notAuthenticated = response?.status === 401;

      if (tokenFounded && notAuthenticated) {
        signOut();
        return response;
      }
      return response;
    });
  };

  return { interceptRequest, interceptResponse };
}
