import React from 'react';
import styled from 'styled-components';
import { ReactChildren } from '../../../types/post/post.type';

const Wrapper = styled.main`
  background-color: ${(props) => props.theme.secondBackground};
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.theme.height + 'px'};
`;
export const Container = styled.div`
  padding: 2rem 3rem;
`;
export const WrapperAuth = styled.div`
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  min-height: ${(props) => props.theme.height - 1 + 'px'};
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const Main = ({ children }: ReactChildren): JSX.Element => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);

export default Main;
