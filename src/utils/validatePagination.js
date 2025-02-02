import createHttpError from 'http-errors';

export const validatePagination = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  if (totalPages < page || page < 1) {
    throw createHttpError(
      400,
      `Page request cannot be more than the total number of pages (${totalPages} or less than 1)`,
    );
  }
};
