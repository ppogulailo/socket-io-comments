import styled from 'styled-components';
import { StyledIoWarning } from '../atom/Error';
import { motion } from 'framer-motion';

const ErrorBlock = styled(motion.div)`
  background-color: ${(props) => props.theme.errorColor};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: sticky;
  top: -1px;
  z-index: 2;
`;

export const ErrorStickyHeader = ({ error }: { error: string | null }) => (
  <ErrorBlock
    initial={{ opacity: 0 }}
    animate={{
      opacity: [1, 0],
      transitionEnd: {
        display: 'none',
      },
      top: 20,
    }}
    transition={{ duration: 5 }}
  >
    <StyledIoWarning color="red" />
    {error}
  </ErrorBlock>
);
