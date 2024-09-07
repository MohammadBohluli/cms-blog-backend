import { BaseError } from ".";

class BadRequest extends BaseError {
  statusCode = 400;
  constructor(message = "Bad Request") {
    super(message);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  serialize() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export default BadRequest;
