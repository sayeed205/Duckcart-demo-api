async function paginatedResults(req, model, { filters, options }) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;

  const result = {};

  const totalDocs = await model.count(filters);

  try {
    result.results = await model
      .find(filters, options)
      .limit(limit)
      .skip(startIndex)
      .exec();

    result.currentPage = page;
    result.totalPages = Math.ceil(totalDocs / limit);
    result.showingResults = result.results.length;
    result.totalResult = totalDocs;

    return result;
  } catch (err) {
    throw Error(err.message);
  }
}

module.exports = paginatedResults;
