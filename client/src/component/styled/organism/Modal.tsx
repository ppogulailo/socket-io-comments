import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Loader } from './Load';
import { motion } from 'framer-motion';
import {IModalProp} from "../../../types/components/components";

const portalRoot = document.getElementById('portal-root')!;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled(motion.div)`
  background-color: ${(props) => props.theme.secondBackground};
  padding: 20px;
  border-radius: 20px;
  max-width: 60%;
  max-height: 90%;
  box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const HeaderRow = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ScrollDisabler = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`;



const Modal: FC<IModalProp> = ({ isOpen, close, children, isLoading }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <Background onClick={close}>
        <Content
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.2 }}
          animate={{ scale: 1 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <HeaderRow></HeaderRow>
              {children}
            </>
          )}
        </Content>
      </Background>
      <ScrollDisabler />
    </>,
    portalRoot
  );
};

export default Modal;
