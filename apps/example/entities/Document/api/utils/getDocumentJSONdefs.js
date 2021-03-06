const getDocumentJSONdefs = (publishName, props) => {
  const queryOr = (options) => [
    { _id: options && options.search },
    { name: options && options.search },
    { nr: options && options.search },
  ];

  const defs = {
    listDocumentDraft: {
      auth: ['member', 'spv'],
      query: { status: { $in: ['Draft', 'Queue'] } },
      queryOr: queryOr(props),
    },
    listDocumentCurrent: {
      auth: ['member', 'spv'],
      query: { status: { $in: ['Processing', 'Active'] } },
      queryOr: queryOr(props),
    },
    listDocumentHistory: {
      auth: ['spv'],
      query: { status: 'Closed' },
      queryOr: queryOr(props),
    },
    detailDocument: {
      auth: ['member'],
      query: { _id: props && props._id },
      // fields: {} add if needed
    },
    addDocument: {
      auth: ['member'],
    },
    updateDocument: {
      auth: ['member'],
    },
    removeDocument: {
      auth: ['spv'],
    },
    setDocumentStatusToActive: {
      auth: ['spv'],
    },
    setDocumentStatusToClosed: {
      auth: ['spv'],
    },
  };
  if (defs[publishName]) return defs[publishName];

  throw new Error(`JSON defs for ${publishName} not found`);
};

export default getDocumentJSONdefs;
