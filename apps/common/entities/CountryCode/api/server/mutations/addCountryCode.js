import CountryCode from '../../index';

import parseHost from '../../../../../helpers/parseHost';
import entityInsert from '../../../../../helpers/server/entityInsert';
import getTenant from '../../../../../helpers/getTenant';
import checkOptions from '../../../../../helpers/checkOptions';
import checkAuth from '../../../../../helpers/checkAuth';
import parseMemberFromContext from '../../../../../helpers/parseMemberFromContext';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';

const publishName = 'addCountryCode';
const action = (args, party) => {
  const now = new Date();

  const newDoc = {
    name: args.name,
    trxDate: now,
    type: 'Master',
    status: 'Draft',
  };

  const _id = entityInsert(CountryCode, newDoc, 'Create new CountryCode', party, undefined, now);

  return CountryCode.findOne(_id);
};

const addCountryCode = (options, resolve, reject) => {
  try {
    checkOptions(options);

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
    addCountryCode(options, resolve, reject);
  });
