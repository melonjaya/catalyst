import CountryCode from '../../index';

// import entityUpdate from '../../../../../../common/modules/server/entityUpdate';
import parseHost from '../../../../../helpers/parseHost';
import getTenant from '../../../../../helpers/getTenant';
import checkOptions from '../../../../../helpers/checkOptions';
import checkOptionsArgsId from '../../../../../helpers/checkOptionsArgsId';
import checkAuth from '../../../../../helpers/checkAuth';
import parseMemberFromContext from '../../../../../helpers/parseMemberFromContext';
// import ownerQuery from '../../../../../modules/ownerQuery';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';

import processCountryCodeToActive from '../processors/processCountryCodeToActive';

const publishName = 'setCountryCodeStatusToActive';
const action = (args, party, tenant) => {
  const countryCode = CountryCode.findOne({
    _id: args._id,
    // ...ownerQuery(tenant.owner),
  });
  if (!countryCode) throw new Error(`[${publishName}] CountryCode not found`);
  if (!(countryCode.status === 'Draft' || countryCode.status === 'Queue'))
    throw new Error(`[${publishName}] CountryCode cannot be edited anymore`);

  return processCountryCodeToActive(countryCode, tenant, party);
};

const setCountryCodeStatusToActive = (options, resolve, reject) => {
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
    setCountryCodeStatusToActive(options, resolve, reject);
  });
