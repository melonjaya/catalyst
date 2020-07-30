import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import CountryCode from '../../index';

import parseDocs from '../../../../../helpers/parseDocs';

Meteor.methods({
  getCountryCodeListForEntry(search) {
    check(search, String);
    if (!Meteor.user()) throw new Error('You must be logged in...');

    const countryCodes = CountryCode.find({}).fetch();

    const options = parseDocs(countryCodes || [], [
      { from: '_id', to: 'value' },
      { from: (doc) => `${doc.alpha3Code} - ${doc.name}`, to: 'label' },
    ]);

    return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));
  },
});
