import Select from 'react-select';
import styled from 'styled-components';

export const CustomSelect = styled(Select).attrs({
  styles: {
    control: () => ({
      border: 'none',
      display: 'flex',
      padding: '0.2rem',
    }),
    option: () => ({
      cursor: 'pointer',
      padding: '0.4rem',
    }),
  },
})`
  background-color: ${(props) => props.theme.background};
  font-family: var(--family);
  border-radius: 15px;

  & input {
    padding-left: 0.25rem;
  }

  & > * {
    color: ${(props) => props.theme.color} !important;
  }

  & > div[id] {
    color: ${(props) => props.theme.color} !important;
    background-color: ${(props) => props.theme.background};
  }
`;
