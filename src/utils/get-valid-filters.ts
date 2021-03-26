//Get valid filters for mongo queries
export const getAcceptedFilters = (acceptedFilters, bodyFilters) => {
  let filters = {};
  Object.keys(bodyFilters).map((key, index) => {
    let isValidFilter = acceptedFilters.indexOf(key) !== -1;
    if (isValidFilter) {
      filters = {
        ...filters,
        [key]: bodyFilters[key],
      };
    }
  });

  return filters;
};
