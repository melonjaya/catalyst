import Tenant from '../../index';

import parseHost from '../../../../../helpers/parseHost';
import checkOptions from '../../../../../helpers/checkOptions';
import checkOptionsArgsId from '../../../../../helpers/checkOptionsArgsId';
import checkAuth from '../../../../../helpers/checkAuth';
import parseMemberFromContext from '../../../../../helpers/parseMemberFromContext';

import getTenantJSONdefs from '../../utils/getTenantJSONdefs';

import processTenantToActive from '../processors/processTenantToActive';

const publishName = 'setTenantStatusToActive';
const action = (args, party) => {
  const tenant = Tenant.findOne({
    _id: args._id,
  });
  if (!tenant) throw new Error(`[${publishName}] Tenant not found`);
  if (!(tenant.status === 'Draft' || tenant.status === 'Queue'))
    throw new Error(`[${publishName}] Tenant cannot be edited anymore`);

  return processTenantToActive(tenant, party);
};

const setTenantStatusToActive = (options, resolve, reject) => {
  try {
    checkOptions(options, checkOptionsArgsId);

    const { args, context } = options;
    const host = parseHost(context.headers.origin);
    const roles = getTenantJSONdefs(publishName).auth;

    checkAuth(context.user, roles, host);

    const party = parseMemberFromContext(context);

    resolve(action(args, party));
  } catch (exception) {
    reject(`[${publishName}] ${exception.message}`);
  }
};

export default (options) =>
  new Promise((resolve, reject) => {
    setTenantStatusToActive(options, resolve, reject);
  });
