import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from './auth.page';
import { ColorText } from '../component/comment/comment';

const NotFoundContainer = styled.div`
  height: ${(props) => props.theme.height - 1 + 'px'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;
const NotFoundBlock = styled.div`
  padding: 5rem;
  background-color: ${(props) => props.theme.secondBackground};
  border-radius: ${(props) => props.theme.borderRadius};
`;
const NotFountPage = (): JSX.Element => {
  return (
    <NotFoundContainer>
      <NotFoundBlock>
        <Text>404 NOT FOUND</Text>
        <ColorText>
          This page doesn&apos;t exist. Go <Link to="/">home</Link>
        </ColorText>
      </NotFoundBlock>
    </NotFoundContainer>
  );
};

export { NotFountPage };
