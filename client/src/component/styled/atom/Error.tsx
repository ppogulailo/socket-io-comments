import styled from 'styled-components';
import { IoWarningOutline } from 'react-icons/io5';

const Error = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  color: ${(props) => props.theme.errorColor};
`;
export const StyledIoWarning = styled(IoWarningOutline)`
  margin-right: 1rem;
  color: ${(props) => props.theme.errorColor};
`;
export const ErrorMessage = ({ error }: { error: string }): JSX.Element => {
  return (
    <Error>
      <StyledIoWarning />
      {error}
    </Error>
  );
};
