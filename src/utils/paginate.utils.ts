import { Pagination } from "../types/responseJson.types";

const paginate = function (
  page: number,
  limit: number,
  totalItems: number
): Pagination {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalPages: totalPages,
    previousPage: page - 1 < 1 ? null : page - 1,
    currentPage: page,
    nextPage: page + 1 > totalPages ? null : page + 1,
  };
};
export default paginate;
