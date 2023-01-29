import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Registration } from '../component/auth/regestration';
import * as React from 'react';
import { Login } from '../component/auth/login';
import { AuthProvider } from '../component/hoc/auth.provider';
import { useNavigate } from 'react-router-dom';
import { ErrorStickyHeader } from '../component/styled/organism/ErrorBlock';
import { useTypeSelector } from '../hooks/useTypeSelector';

export const Block = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.secondBackground};
  padding: 2rem 2rem;
  border-radius: ${(props) => props.theme.borderRadius};
`;
export const Text = styled.div`
  font-size: 35px;
  color: ${(props) => props.theme.color};
`;

export const Form = styled.form``;
export const AuthPage = (): JSX.Element => {
  const navigate = useNavigate();
  const authError = useTypeSelector((state) => state.auth.error);
  useEffect(() => {
    if (localStorage.getItem('authToken')) navigate('/');
  }, []);
  const [toggle, setToggle] = useState(true);
  return (
    <AuthProvider>
      {authError && <ErrorStickyHeader error={authError} />}
      {toggle ? (
        <Registration toggle={toggle} setToggle={setToggle} />
      ) : (
        <Login toggle={toggle} setToggle={setToggle} />
      )}
    </AuthProvider>
  );
};
