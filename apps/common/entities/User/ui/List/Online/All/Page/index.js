import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import { Link } from 'react-router-dom';

import { Breadcrumb, DropdownButton, MenuItem } from 'react-bootstrap';

import SearchInput from '../../../../../../../ui/components/SearchInput';
import SettingsIcon from '../../../../../../../ui/components/Icon/Settings';
import Icon from '../../../../../../../ui/components/Icon';
import TableSimple from '../../../../../../../ui/components/Table/Simple';

import parser from '../../../../Parser';

import UserListOnlineAll from '../index';

import { StyledHeader } from './styles';

class UserListOnlineAllPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      currentPage: 1,
    };
  }

  render() {
    const { history, settings } = this.props;
    const { search, currentPage } = this.state;
    const { perPage } = settings;

    return (
      <React.Fragment>
        <Breadcrumb>
          <li>
            <Link to="/Root/User">Root / User</Link>
          </li>
          <Breadcrumb.Item active>Online</Breadcrumb.Item>
        </Breadcrumb>
        <StyledHeader className="page-header clearfix">
          <DropdownButton
            bsStyle="default"
            title={SettingsIcon}
            id="dropdownbutton_UserListOnlineAllPage"
          >
            <MenuItem onClick={() => history.push('/Root/User/current')}>
              <Icon iconStyle="solid" icon="external-link-alt" />
              {' Current'}
            </MenuItem>
          </DropdownButton>
          <SearchInput
            placeholder="Search User..."
            value={search}
            onChange={(event) => {
              this.setState({ search: event.target.value, currentPage: 1 });
            }}
          />
        </StyledHeader>

        <UserListOnlineAll
          parser={parser}
          component={TableSimple}
          settings={settings}
          search={search}
          currentPage={currentPage}
          perPage={perPage}
          onChangePage={(currentPageNow) => this.setState({ currentPage: currentPageNow })}
        />
      </React.Fragment>
    );
  }
}

UserListOnlineAllPage.propTypes = {
  settings: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default UserListOnlineAllPage;
