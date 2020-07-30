import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import CountryCode from '../../index';

import getCountryCodeJSONdefs from '../../utils/getCountryCodeJSONdefs';
import pubProcessor from '../../../../../helpers/server/pubProcessor';

const publishName = 'listCountryCodeHistory';
Meteor.publish(publishName, function pub(props) {
  check(props, Object);
  try {
    return pubProcessor(CountryCode, publishName, getCountryCodeJSONdefs, props, this);
  } catch (exception) {
    console.error(`PUBLISH EXCEPTION - ${publishName} - userId: ${Meteor.userId()}`, exception);
    return this.ready();
  }
});
