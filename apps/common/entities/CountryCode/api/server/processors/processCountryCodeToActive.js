import CountryCode from '../../index';

import entityUpdate from '../../../../../helpers/server/entityUpdate';

const processCountryCodeToActive = (countryCode, tenant, party) => {
  let timestamp = new Date();

  // set to processing, this is to prevent race condition, since we havent used mongodb transaction yet
  entityUpdate(
    CountryCode,
    { _id: countryCode._id },
    {
      status: 'Processing',
    },
    'Set CountryCode to Processing',
    party,
    timestamp,
  );

  timestamp = new Date();

  entityUpdate(
    CountryCode,
    { _id: countryCode._id },
    {
      // postingDate,
      status: 'Active',
    },
    'Set CountryCode to Active',
    party,
    timestamp,
  );

  return CountryCode.findOne(countryCode._id);
};

export default processCountryCodeToActive;
