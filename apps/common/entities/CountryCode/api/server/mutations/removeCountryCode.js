import CountryCode from '../../index';

import parseHost from '../../../../../helpers/parseHost';
import getTenant from '../../../../../helpers/getTenant';
import checkOptions from '../../../../../helpers/checkOptions';
import checkOptionsArgsId from '../../../../../helpers/checkOptionsArgsId';
import checkAuth from '../../../../../helpers/checkAuth';
import parseMemberFromContext from '../../../../../helpers/parseMemberFromContext';
// import ownerQuery from '../../../../../modules/ownerQuery';
import entityRemove from '../../../../../helpers/server/entityRemove';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';

const publishName = 'removeCountryCode';
const action = (args, party) => {
  const query = {
    _id: args._id,
    status: 'Draft',
    // ...ownerQuery(tenant.owner),
  };

  entityRemove(CountryCode, query, 'Delete CountryCode permanently', party);

  return args;
};

const removeCountryCode = (options, resolve, reject) => {
  try {
    checkOptions(options, checkOptionsArgsId);

    const { args, context } = options;
    const host = parseHost(context.headers.origin);
    const roles = getCountryCodeJSONdefs(publishName).auth;

    checkAuth(context.user, roles, host);

    const party = parseMemberFromContext(context);
    const tenant = getTenant(host);

    resolve(action(args, party, tenant));
  } catch (exception) {
    reject(`[${publishName}] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    removeCountryCode(options, resolve, reject);
  });
