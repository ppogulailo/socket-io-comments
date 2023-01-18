import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { ReactChildren } from '../../types/components/post/post.type';

const RequireAuthProvider: FC<ReactChildren> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
};

export { RequireAuthProvider };
