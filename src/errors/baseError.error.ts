abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract serialize(): { message: string; statusCode: number };
}

export default BaseError;
