import CountryCode from '../../index';

import parseHost from '../../../../../helpers/parseHost';
import getTenant from '../../../../../helpers/getTenant';
import getProjection from '../../../../../helpers/getProjection';
import checkOptions from '../../../../../helpers/checkOptions';
import checkAuth from '../../../../../helpers/checkAuth';
import parseMemberFromContext from '../../../../../helpers/parseMemberFromContext';
// import ownerQuery from '../../../../../modules/ownerQuery';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';

const publishName = 'detailCountryCode';
const action = (args) => {
  return args && args._id
    ? CountryCode.findOne(
        {
          ...getCountryCodeJSONdefs(publishName, args).query,
          // ...ownerQuery(tenant.owner),
        },
        getProjection(args),
      )
    : {};
};

const detailCountryCode = (options, resolve, reject) => {
  try {
    checkOptions(options);

    const { context } = options;
    const host = parseHost(context.headers.origin);
    const roles = getCountryCodeJSONdefs(publishName).auth;

    checkAuth(context.user, roles, host);

    const party = parseMemberFromContext(context);
    const tenant = getTenant(host);

    resolve(action(options, party, tenant));
  } catch (exception) {
    reject(`[${publishName}] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    detailCountryCode(options, resolve, reject);
  });
