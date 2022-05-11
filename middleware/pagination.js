const pagination = (inputLimit, inputPage) => {
  let limit = 100;
  let skip = 0;
  if (inputLimit) {
    limit = inputLimit;
  }
  if (inputPage) {
    skip = limit * inputPage;
    console.log(limit);
    console.log(skip);
  }
  return [limit, skip];
};

module.exports = pagination;
