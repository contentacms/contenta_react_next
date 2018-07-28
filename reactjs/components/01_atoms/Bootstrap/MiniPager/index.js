import React from 'react';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const MiniPager = () => (
  <Pagination>
    <PaginationItem>
      <PaginationLink previous />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink next />
    </PaginationItem>
  </Pagination>
);

export default MiniPager;
