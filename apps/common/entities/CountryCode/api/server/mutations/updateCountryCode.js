import sanitizeHtml from 'sanitize-html';

import CountryCode from '../../index';

import cleanseDocDiff from '../../../../../helpers/cleanseDocDiff';
import parseHost from '../../../../../helpers/parseHost';
import entityUpdate from '../../../../../helpers/server/entityUpdate';
import getTenant from '../../../../../helpers/getTenant';
import checkOptions from '../../../../../helpers/checkOptions';
import checkOptionsArgsId from '../../../../../helpers/checkOptionsArgsId';
import checkAuth from '../../../../../helpers/checkAuth';
import parseMemberFromContext from '../../../../../helpers/parseMemberFromContext';
// import ownerQuery from '../../../../../modules/ownerQuery';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';

const publishName = 'updateCountryCode';
const action = (args, party) => {
  const countryCode = CountryCode.findOne({
    _id: args._id,
    // ...ownerQuery(tenant.owner),
  });
  if (!countryCode) throw new Error(`[${publishName}] CountryCode not found`);
  if (!(countryCode.status === 'Draft' || countryCode.status === 'Queue'))
    throw new Error(`[${publishName}] CountryCode cannot be edited anymore`);
  if (countryCode.status === 'Processing')
    throw new Error(`[${publishName}] CountryCode is in other process. Please wait and repeat`);

  const newDoc = cleanseDocDiff(args, countryCode);
  newDoc.description = newDoc.description ? sanitizeHtml(newDoc.description) : newDoc.description;

  entityUpdate(CountryCode, { _id: countryCode._id }, newDoc, 'Updating CountryCode', party);

  return CountryCode.findOne(args._id);
};

const updateCountryCode = (options, resolve, reject) => {
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
    updateCountryCode(options, resolve, reject);
  });
