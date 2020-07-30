import { Bert } from 'meteor/themeteorchef:bert';

import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { Breadcrumb, DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';

import Icon from '../../../../../ui/components/Icon';
import SettingsIcon from '../../../../../ui/components/Icon/Settings';

import CountryCodeDetail from '../../Detail';
import CountryCodeEditor from '../../Editor';

import detailCountryCode from '../../queries.gql';

import {
  updateCountryCode,
  removeCountryCode,
  setCountryCodeStatusToActive,
} from '../../mutations.gql';

class CountryCodeEditPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      data: {
        detailCountryCode: undefined,
      },
    };
  }

  render() {
    const { updateDoc, removeDoc, setStatusToActive, settings, history, match } = this.props;
    const { data } = this.state;

    return (
      <React.Fragment>
        <Breadcrumb>
          <li>
            <Link to="/CountryCode">CountryCode</Link>
          </li>
          <Breadcrumb.Item active>
            {`Edit / ${data.detailCountryCode &&
              (data.detailCountryCode.nr ||
                data.detailCountryCode.name ||
                data.detailCountryCode._id)}`}
          </Breadcrumb.Item>
        </Breadcrumb>

        <React.Fragment>
          <DropdownButton
            bsStyle="default"
            title={SettingsIcon}
            id="dropdownbutton_CountryCodeEditPage"
          >
            <MenuItem
              onClick={() => history.push(`/QRCode/CountryCode/${data.detailCountryCode._id}`)}
            >
              <Icon iconStyle="solid" icon="qrcode" />
              {' Show QR-Code'}
            </MenuItem>
            {data.detailCountryCode &&
              data.detailCountryCode.name &&
              data.detailCountryCode.status === 'Draft' && (
                <React.Fragment>
                  <MenuItem divider />
                  <MenuItem header>STATUS</MenuItem>
                  <MenuItem onClick={setStatusToActive}>
                    <Icon iconStyle="solid" icon="external-link-alt" />
                    {' Set to ACTIVE'}
                  </MenuItem>
                </React.Fragment>
              )}
          </DropdownButton>
          <hr />
          <CountryCodeDetail
            component={CountryCodeEditor}
            parentFunc={(dataNow) => this.setState({ data: dataNow })}
            disabled={false}
            updateDoc={(options, dataNow) => {
              updateDoc(options);
              if (dataNow) {
                this.setState({ data: dataNow });
              }
            }}
            removeDoc={removeDoc}
            history={history}
            match={match}
            settings={settings}
          />
        </React.Fragment>
      </React.Fragment>
    );
  }
}

CountryCodeEditPage.propTypes = {
  updateDoc: PropTypes.func.isRequired,
  removeDoc: PropTypes.func.isRequired,
  setStatusToActive: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default compose(
  graphql(updateCountryCode, {
    name: 'updateDoc',
    options: ({ match }) => ({
      refetchQueries: [{ query: detailCountryCode, variables: { _id: match.params._id } }],
      onCompleted: () => {
        Bert.alert('CountryCode updated!', 'success');
      },
      onError: (error) => {
        Bert.alert(error.message, 'danger');
      },
    }),
  }),
  graphql(removeCountryCode, {
    name: 'removeDoc',
    options: ({ history }) => ({
      onCompleted: () => {
        Bert.alert('CountryCode deleted!', 'success');
        history.push('/CountryCode/Draft');
      },
      onError: (error) => {
        Bert.alert(error.message, 'danger');
      },
    }),
  }),
  graphql(setCountryCodeStatusToActive, {
    name: 'setStatusToActive',
    options: ({ match, history }) => ({
      refetchQueries: [{ query: detailCountryCode, variables: { _id: match.params._id } }],
      variables: {
        _id: match.params._id,
      },
      onCompleted: () => {
        Bert.alert('CountryCode Status set to Active!', 'success');
        history.push('/CountryCode');
      },
      onError: (error) => {
        Bert.alert(error.message, 'danger');
      },
    }),
  }),
)(CountryCodeEditPage);
