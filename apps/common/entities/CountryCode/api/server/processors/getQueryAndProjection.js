import { Meteor } from 'meteor/meteor';

import parsePropsToQueryOptions from '../../../../../helpers/parsePropsToQueryOptions';
import parseHost from '../../../../../helpers/parseHost';
import checkAuth from '../../../../../helpers/checkAuth';
// import getTenant from '../../../../../modules/getTenant';
// import ownerQuery from '../../../../../modules/ownerQuery';
import getProjection from '../../../../../helpers/getProjection';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';

const getQueryAndProjection = (publishName, props, parent) => {
  const host = parseHost(parent.connection.httpHeaders.host);
  const roles = getCountryCodeJSONdefs(publishName).auth;

  checkAuth(Meteor.user(), roles, host);

  // const tenant = getTenant(host);
  const options = parsePropsToQueryOptions(props);

  const query = options.search
    ? {
        ...getCountryCodeJSONdefs(publishName, props).query,
        // ...ownerQuery(tenant.owner),
        $or: getCountryCodeJSONdefs(publishName, options).queryOr,
      }
    : {
        ...getCountryCodeJSONdefs(publishName, props).query,
        // ...ownerQuery(tenant.owner),
        // level: 1, countryCode, you can add something here
      };

  const projection = getProjection(options);

  return { query, projection };
};

export default getQueryAndProjection;
