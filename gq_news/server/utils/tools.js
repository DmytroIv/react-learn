
export const userOwnership = (req, valueToCompare) => req._id.toString() === valueToCompare.toString();

export const sortArgsHelper = (sort) => {
  let sortArgs = {
    sortBy: '_id',
    order: 'asc',
    limit: 10,
    skip: 0
  }

  for (const key in sort) {
    if (sort[key]) {
      sortArgs[key] = sort[key];
    }
  }

  return sortArgs;
}