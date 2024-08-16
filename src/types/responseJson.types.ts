type Pagination = {
  totalPages: number;
  page: number;
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
};

type ResponseJson = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: Array<object> | object;
  pagination?: Pagination;
};

export default ResponseJson;
