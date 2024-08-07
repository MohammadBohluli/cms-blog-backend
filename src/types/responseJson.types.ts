type ResponseJson = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: Array<object> | object;
};

export default ResponseJson;
