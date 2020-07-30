import addCountryCode from './addCountryCode';
import updateCountryCode from './updateCountryCode';
import removeCountryCode from './removeCountryCode';

import setCountryCodeStatusToActive from './setCountryCodeStatusToActive';
import setCountryCodeStatusToClosed from './setCountryCodeStatusToClosed';

export default {
  addCountryCode: (root, args, context) =>
    addCountryCode({
      context,
      args,
    }),
  updateCountryCode: (root, args, context) =>
    updateCountryCode({
      context,
      args: args.inputCountryCode,
    }),
  removeCountryCode: (root, args, context) =>
    removeCountryCode({
      context,
      args,
    }),

  setCountryCodeStatusToActive: (root, args, context) =>
    setCountryCodeStatusToActive({
      context,
      args,
    }),
  setCountryCodeStatusToClosed: (root, args, context) =>
    setCountryCodeStatusToClosed({
      context,
      args,
    }),
};
