import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import React, { FC, useState } from 'react';
import { IPaginationProp } from '../../../types/comment/comment.type';
import { useSearchParams } from 'react-router-dom';
import { Text } from '../../../page/auth.page';
import { motion } from 'framer-motion';

const Paginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  list-style-type: none;
  display: flex;
  align-items: center;
  flex: auto;
  justify-content: center;
  margin: 0;
  padding: 1rem;

  li a {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme.buttonColor};
    background-color: ${(props) => props.theme.secondBackground};
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.threeBackground};
      border-radius: 5px;
    }
  }

  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }

  li.active a {
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.buttonColor};
  }

  li.disabled a {
    color: grey;

    &:hover {
      background-color: ${(props) => props.theme.secondBackground};
    }
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  & > * {
    margin-right: 2rem;
  }
`;
type Foo = {
  page: string;
};
export const Pagination: FC<IPaginationProp> = ({ root, children, count, onPaginate }) => {
  const [itemsPerPage] = useState(25);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.ceil(count! / itemsPerPage);

  const handlePageClick = (event: any) => {
    const params: Partial<Foo | any> = {};
    Array.from(searchParams.keys()).map((_, i) => {
      params[Array.from(searchParams.keys())[i]] = Array.from(searchParams.values())[i];
    });
    params.page = event.selected;
    setSearchParams(params);
    onPaginate(event.selected);
  };
  if (!root?.length) {
    return (
      <Container>
        <motion.div
          // initial={}
          animate={{ rotate: 60 }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaSearch size={42} />
        </motion.div>
        <Text>No Comment there!</Text>
      </Container>
    );
  }
  return (
    <>
      {children(root)}
      <Paginate
        breakLabel="..."
        nextLabel={<FaArrowRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        forcePage={searchParams.get('page') ? Number(searchParams.get('page')) : 0}
        pageCount={pageCount}
        previousLabel={<FaArrowLeft />}
      />
    </>
  );
};
