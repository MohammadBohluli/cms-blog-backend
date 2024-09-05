export type Pagination = {
  totalPages: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
};

type ResponseJson = {
  statusCode: number;
  message?: string | string[];
  data?: Array<object> | object;
  pagination?: Pagination;
};

export default ResponseJson;
