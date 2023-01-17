import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.theme.height + 'px'};
  margin: auto;
`;
export const Loader = styled(motion.div)`
  border: 8px solid;
  border-radius: 50%;
  border-top: 8px solid;
  border-bottom: 8px solid;
  border-top-color: ${(props) => props.theme.buttonColor};
  border-bottom-color: ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.secondBackground};
  width: 70px;
  height: 70px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Load = () => {
  return (
    <LoadWrapper>
      <Loader />
    </LoadWrapper>
  );
};

export default Load;
