import { BaseError } from ".";

class InvalidError extends BaseError {
  statusCode = 401;
  constructor(message = "Invalid data.") {
    super(message);
    Object.setPrototypeOf(this, InvalidError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default InvalidError;
