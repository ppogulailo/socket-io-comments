import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title } from './Header';
import { FaCubes } from 'react-icons/fa';

const HeaderEl = styled.footer`
  background-color: ${(props) => props.theme.background};
`;
const Wrapper = styled(Link).attrs({
  to: '/',
})`
  text-decoration: none;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => props.theme.errorColor};
  align-items: center;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  margin: 0rem 6rem;
`;
const Footer = (): JSX.Element => (
  <HeaderEl>
    <Wrapper>
      <FaCubes size={42} color={'hsl(349,52%,61%)'} />
      <Title>Footer</Title>
    </Wrapper>
  </HeaderEl>
);

export default Footer;
