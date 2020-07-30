import createIndex from '../../../../helpers/server/createIndex';
import CountryCode from '..';

createIndex(CountryCode, { name: 1, alpha2Code: 1, alpha3Code: 1, ccTLD: 1 });
