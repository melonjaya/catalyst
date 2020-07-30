const getCountryCodeJSONdefs = (publishName, props) => {
  const queryOr = (options) => [
    { _id: options && options.search },
    { name: options && options.search },
    { officialName: options && options.search },
    { sovereignty: options && options.search },
    { alpha2Code: options && options.search },
    { alpha3Code: options && options.search },
    { numericCode: options && options.search },
    { ccTLD: options && options.search },
  ];

  const defs = {
    listCountryCodeDraft: {
      auth: ['member', 'spv'],
      query: { status: { $in: ['Draft', 'Queue'] } },
      queryOr: queryOr(props),
    },
    listCountryCodeCurrent: {
      auth: ['member', 'spv'],
      query: { status: { $in: ['Processing', 'Active'] } },
      queryOr: queryOr(props),
    },
    listCountryCodeHistory: {
      auth: ['spv'],
      query: { status: 'Closed' },
      queryOr: queryOr(props),
    },
    detailCountryCode: {
      auth: ['member'],
      query: { _id: props && props._id },
    },
    addCountryCode: {
      auth: ['member'],
    },
    updateCountryCode: {
      auth: ['member'],
    },
    removeCountryCode: {
      auth: ['spv'],
    },
    setCountryCodeStatusToActive: {
      auth: ['spv'],
    },
    setCountryCodeStatusToClosed: {
      auth: ['spv'],
    },
  };
  if (defs[publishName]) return defs[publishName];

  throw new Error(`JSON defs for ${publishName} not found`);
};

export default getCountryCodeJSONdefs;
