import React from 'react';
import { Link } from '../../../routes';

const Logo = () => (
    <Link to="/">
      <a className="logo">
        <img src="/static/logo.svg" alt="Home" rel="index" />
      </a>
    </Link>
);

export default Logo;
