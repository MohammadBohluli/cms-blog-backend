import { BaseError } from ".";

class NotAuthenticatedError extends BaseError {
  statusCode = 401;
  constructor(message = "Not authenticated.") {
    super(message);
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default NotAuthenticatedError;
