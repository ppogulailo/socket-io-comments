import styled from 'styled-components';
import React from 'react';

export const FileInput = styled.input`
  &[type='file']::file-selector-button {
    background-color: ${(props) => props.theme.background};
    border-radius: ${(props) => props.theme.borderRadius};
    color: ${(props) => props.theme.text};
    border: 2px solid ${(props) => props.theme.background};
    padding: 1rem 1rem;
    margin-right: 20px;
    transition: all 0.5s;
  }
  &[type='file']::file-selector-button:hover {
    border-color: ${(props) => props.theme.buttonColor};
  }
`;
export const Input = styled.input`
  background-color: ${(props) => props.theme.background};
  padding: 0.5rem 1rem;
  border: none;
  width: 80%;
  outline: none;
  color: ${(props) => props.theme.text};
  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;

export const InputContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 0.2rem;
  border: 2px solid;
  border-color: ${(props) => props.theme.background};
  margin: 0 0 0.5rem 0;

  &:hover {
    border-color: ${(props) => props.theme.buttonColor};
  }
`;
export const InputRegContainer = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const TextField = ({ children, ...props }: any) => {
  return (
    <InputContainer>
      {children}
      <Input {...props} {...props.validation} />
    </InputContainer>
  );
};
