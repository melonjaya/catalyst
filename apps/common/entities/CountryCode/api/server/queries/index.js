import detailCountryCode from './detailCountryCode';

export default {
  detailCountryCode: (parent, args, context) =>
    detailCountryCode({
      context,
      _id: (parent && parent.CountryCodeId) || args._id,
    }),
};
