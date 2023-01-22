import React, { FC, useContext } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { ReactChildren } from '../../types/post/post.type';

const Auth = React.createContext<{ isAuth: boolean | null } | null>(null);

export function useAuth() {
  const authContext = useContext(Auth);
  if (!authContext) throw new Error('Unexpected error!');
  return authContext;
}

export const AuthProvider: FC<ReactChildren> = ({ children }) => {
  const { isAuth } = useTypeSelector((state) => state.auth);

  return <Auth.Provider value={{ isAuth }}>{children}</Auth.Provider>;
};
