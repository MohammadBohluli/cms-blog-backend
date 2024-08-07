import { BaseError } from ".";

class ExpiredError extends BaseError {
  statusCode = 401;
  constructor(message = "Your token has expired.") {
    super(message);
    Object.setPrototypeOf(this, ExpiredError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default ExpiredError;
