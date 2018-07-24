import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'reactstrap';
import { Link } from '../../../../routes';

const CardAsLink = ({ href, ...props }) => (
  <Link to={href}>
    <a className="card-link">
      <Card {...props}  />
    </a>
  </Link>
);

CardAsLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default CardAsLink;
