import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMoon, FaReact, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../../redux/store';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { changeTheme } from '../../../redux/reducer/theme.reducer';

const HeaderEl = styled.header`
  //box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
  background-color: ${(props) => props.theme.background};
  z-index: 5;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  margin: 0rem 6rem;
`;

const WrapperBlock = styled(Link).attrs({
  to: '/',

  // preventScrollReset:true
})`
  text-decoration: none;
  display: flex;

  align-items: center;
`;
export const Title = styled.div`
  margin-left: 1rem;
  color: ${(props) => props.theme.errorColor};
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
`;
const StyledIconMoon = styled(FaMoon)`
  color: ${(props) => props.theme.errorColor};
  cursor: pointer;
`;
const StyledIconSun = styled(FaSun)`
  color: ${(props) => props.theme.errorColor};
  cursor: pointer;
`;
const StyledIconReact = styled(FaReact)`
  color: hsl(349, 52%, 61%);
`;
const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { themes } = useTypeSelector((state) => state.theme);
  const isDarkTheme = themes === 'dark';
  const handleTheme = () => {
    dispatch(changeTheme(isDarkTheme ? 'light' : 'dark'));
  };
  return (
    <HeaderEl>
      <Wrapper>
        <WrapperBlock>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>
            <StyledIconReact size={42} />
          </motion.div>
          <Title>React App</Title>
        </WrapperBlock>
        {isDarkTheme ? (
          <StyledIconMoon onClick={handleTheme} size={42} />
        ) : (
          <StyledIconSun onClick={handleTheme} size={42} />
        )}
      </Wrapper>
    </HeaderEl>
  );
};

export default Header;
