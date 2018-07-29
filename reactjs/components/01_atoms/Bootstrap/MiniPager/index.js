import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { withRouter } from 'next/router';
import { Router } from '../../../../routes';

class MiniPager extends React.Component {

  constructor(props) {
    super(props);

    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }

  handlePrevPageClick() {
    const { router, prevPageAllowed } = this.props;
    const currentPage = router.query.page ? parseInt(router.query.page, 10) : 0;

    if (!prevPageAllowed) {
      return;
    }

    router.query.page = currentPage - 1;
    Router.push(router);
  }

  handleNextPageClick() {
    const { router, nextPageAllowed } = this.props;
    const currentPage = router.query.page ? parseInt(router.query.page, 10) : 0;

    if (!nextPageAllowed) {
      return;
    }

    router.query.page = currentPage + 1;
    Router.push(router);
  }

  render() {
    // TODO: Don't render pager when nothing is allowed.
    const { prevPageAllowed, nextPageAllowed } = this.props;
    return (
      <Pagination>
        <PaginationItem disabled={!prevPageAllowed} onClick={this.handlePrevPageClick}>
          <PaginationLink previous/>
        </PaginationItem>
        <PaginationItem disabled={!nextPageAllowed} onClick={this.handleNextPageClick}>
          <PaginationLink next/>
        </PaginationItem>
      </Pagination>
    );
  }
}

MiniPager.propTypes = {
  prevPageAllowed: PropTypes.bool,
  nextPageAllowed: PropTypes.bool,
};

MiniPager.defaultProps = {
  prevPageAllowed: true,
  nextPageAllowed: true,
};

export default withRouter(MiniPager);
