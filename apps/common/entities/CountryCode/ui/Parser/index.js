import parseDocs from '../../../../helpers/parseDocs';
import { iso } from '../../../../helpers/dates';

const CountryCodeParser = (docs, settings) => {
  return parseDocs(docs, [
    { from: '_id', to: '_id' },
    { from: 'name', to: 'name' },
    { from: 'officialName', to: 'officialName' },
    { from: 'sovereignty', to: 'sovereignty' },
    { from: 'alpha2Code', to: 'alpha2Code' },
    { from: 'alpha3Code', to: 'alpha3Code' },
    { from: 'numericCode', to: 'numericCode' },
    { from: 'ccTLD', to: 'ccTLD' },
    { from: 'type', to: 'type' },
    { from: 'status', to: 'status' },
    {
      from: (doc) => doc.updatedAt && iso(doc.updatedAt, settings.timezone, 'LLLL'),
      to: 'Updated At',
    },
    {
      from: (doc) => `/CountryCode/${doc._id}${doc.status === 'Draft' ? '/edit' : ''}`,
      to: 'linkUrl',
    },
  ]);
};

export default CountryCodeParser;
