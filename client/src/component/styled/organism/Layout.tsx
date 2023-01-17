import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from '../atom/Main';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { ErrorStickyHeader } from './ErrorBlock';

const Layout = () => {
  const { error: postError } = useTypeSelector((state) => state.post);
  const { error: commentError } = useTypeSelector((state) => state.comment);
  const { error: authError } = useTypeSelector((state) => state.auth);
  return (
    <>
      <Header />
      {(postError || commentError || authError) && (
        <ErrorStickyHeader error={postError || commentError || authError} />
      )}

      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
export default Layout;
