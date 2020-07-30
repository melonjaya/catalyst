import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import { compose, graphql } from 'react-apollo';

import Loading from '../../../../ui/components/Loading';
import BlankState from '../../../../ui/components/BlankState';

import detailCountryCode from '../queries.gql';

class CountryCodeDetail extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate(prevProps) {
    const prevId =
      prevProps.data && prevProps.data.detailCountryCode && prevProps.data.detailCountryCode._id;
    const { parentFunc, data } = this.props;
    const nowId = data.detailCountryCode && data.detailCountryCode._id;

    if (nowId !== prevId) parentFunc(data);
  }

  render() {
    const {
      data,
      component,
      updateDoc,
      removeDoc,
      disabled,
      settings,
      history,
      match,
    } = this.props;

    if (data.loading) return <Loading />;

    if (!data.detailCountryCode)
      return (
        <BlankState
          icon={{ style: 'solid', symbol: 'file-alt' }}
          title="CountryCode not found!"
          subtitle={`Id: ${match.params._id} is invalid`}
        />
      );

    if (disabled && data.detailCountryCode.status === 'Draft')
      return (
        <BlankState
          icon={{ style: 'solid', symbol: 'file-alt' }}
          title="Please use Edit View!"
          subtitle={`Status is still ${data.detailCountryCode.status}`}
        />
      );

    if (!(disabled || data.detailCountryCode.status === 'Draft'))
      return (
        <BlankState
          icon={{ style: 'solid', symbol: 'file-alt' }}
          title="CountryCode cannot be edited anymore!"
          subtitle={`Status is already ${data.detailCountryCode.status}`}
        />
      );

    return React.createElement(component, {
      disabled,
      doc: data.detailCountryCode,
      updateDoc,
      removeDoc,
      history,
      settings,
    });
  }
}

CountryCodeDetail.propTypes = {
  data: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired,
  parentFunc: PropTypes.func.isRequired,
  updateDoc: PropTypes.func.isRequired,
  removeDoc: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default compose(
  graphql(detailCountryCode, {
    options: ({ match }) => ({
      fetchPolicy: 'no-cache',
      variables: {
        _id: match.params._id,
      },
    }),
  }),
)(CountryCodeDetail);
