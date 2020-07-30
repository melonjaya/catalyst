import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Counts } from 'meteor/tmeasday:publish-counts';

import getQueryAndProjection from '../processors/getQueryAndProjection';

import CountryCode from '../..';

const publishName = 'listCountryCodeCurrent';
Meteor.publish(publishName, function pub(props) {
  check(props, Object);
  try {
    // this is just for countryCode. if you dont need it, just look at listCountryCodeDraft
    const { query, projection } = getQueryAndProjection(publishName, props, this);

    Counts.publish(this, `${publishName}Count`, CountryCode.find(query));

    return CountryCode.find(query, projection);
  } catch (exception) {
    console.error(`PUBLISH EXCEPTION - ${publishName} - userId: ${Meteor.userId()}`, exception);
    return this.ready();
  }
});
