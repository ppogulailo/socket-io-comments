import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonStyle = styled(motion.button).attrs((props) => ({
  type: props.type,
}))`
  padding: 0 1rem;
  background-color: ${(props) => props.theme.background};
  box-shadow: var(--shadow);
  line-height: 2.5;
  border-radius: var(--raddi);
  color: ${(props) => props.theme.text};
  border: none;
  gap: 0.75rem;
  cursor: pointer;
  width: 150px;
  margin: 0.5rem 0;
  border-radius: 20px;
  //cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.theme.buttonColor};
    color: ${(props) => props.theme.color};
  }
  &:disabled {
    background-color: ${(props) => props.theme.disable};
    color: ${(props) => props.theme.color};
    cursor: revert;
  }
`;
export const Button = ({ ...props }) => {
  return <ButtonStyle {...props} whileTap={{ scale: 0.8 }} />;
};
