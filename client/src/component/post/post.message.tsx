import styled from 'styled-components';
import { IconBtn } from '../styled/atom/IconBtn';
import { usePost } from '../hoc/post.provider';
import { FaFileAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { IPost } from '../../types/post/post.type';

const PostBody = styled(motion.section)`
  cursor: pointer;
  border: 1px solid;
  display: grid;
  border: none;
  border-radius: 20px;
  border-color: ${(props) => props.theme.secondBackground};
  box-shadow: 12px 12px 2px 1px ${(props) => props.theme.threeBackground};
  padding: 2rem;
  max-width: 300px;
  &:hover {
    box-shadow: 12px 12px 2px 1px ${(props) => props.theme.buttonColor};
  }
`;
const TextZagolov = styled.div`
  text-align: center;
  font-size: 20px;
  color: ${(props) => props.theme.text};
  border-radius: 15px;
  height: 50px;
`;
const FooterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
`;

export const PostMessage: FC<IPost> = (el) => {
  const { postRemove, id } = usePost();
  const navigate = useNavigate();
  return (
    <PostBody
      onClick={() => navigate(`/post/${el.id}`)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ ease: 'easeOut' }}
    >
      {el.title.length > 20 ? (
        <TextZagolov>{el.title.substring(0, 10)}...</TextZagolov>
      ) : (
        <TextZagolov>{el.title}</TextZagolov>
      )}
      {el.body.length > 20 ? <div>{el.body.substring(0, 20)}...</div> : <div>{el.body}</div>}
      <FooterBlock>
        {el.user.id === id && (
          <IconBtn
            Icon={FaTrash}
            onClick={(e: Event) => {
              e.stopPropagation();
              postRemove(el.id);
            }}
          ></IconBtn>
        )}
        {el.user.name}
        {el.file && <FaFileAlt color="hsl(349,52%,61%)" />}
      </FooterBlock>
    </PostBody>
  );
};
