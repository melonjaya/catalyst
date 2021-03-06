import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ExampleNavigationPublic from './Public';
import ExampleNavigationAuthenticated from './Authenticated';

const ExampleNavigation = (props) => {
  const { location, authenticated, settings } = props;

  if (location && location.pathname && location.pathname.includes('QRCode')) return <div />;

  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">{settings.productname}</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {authenticated ? (
          <ExampleNavigationAuthenticated {...props} />
        ) : (
          <ExampleNavigationPublic />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

ExampleNavigation.defaultProps = {
  name: '',
  location: undefined,
  settings: {},
  roles: [],
};

ExampleNavigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  name: PropTypes.string,
  location: PropTypes.object,
  settings: PropTypes.object,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default ExampleNavigation;
