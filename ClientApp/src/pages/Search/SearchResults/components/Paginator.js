import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';

const Paginator = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageAmount = Math.ceil(itemsCount / pageSize);
  if (pageAmount === 1) return null;
  const pages = _.range(1, pageAmount + 1);

  return (
    <Pagination>
      {pages.map(page => (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
};

export default Paginator;
