import styled from 'styled-components';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { dispatchAction } from '../../../types/auth/auth.type';

const IconButton = styled.button`
  border: none;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.buttonColor};
  padding: 0.5rem;
  //display: flex;
  background-color: ${(props) => props.theme.secondBackground};
  cursor: pointer;
  & > * {
    transition: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.buttonColor};
    border-radius: 5px;
    color: ${(props) => props.theme.color};
  }
`;

export function IconBtn({
  Icon,
  children,
  onClick,
}: {
  Icon: IconType;
  children?: ReactNode;
  onClick: dispatchAction<any>;
}) {
  const ChildIcon = styled(Icon)`
    transition: none;
    & > * {
      transition: none;
    }
  `;
  return (
    <IconButton onClick={onClick}>
      {children}
      <ChildIcon />
    </IconButton>
  );
}
