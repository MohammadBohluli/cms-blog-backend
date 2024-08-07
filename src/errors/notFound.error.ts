import { BaseError } from ".";

class NotFoundError extends BaseError {
  statusCode = 404;
  constructor(message = "Not founded.") {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default NotFoundError;
