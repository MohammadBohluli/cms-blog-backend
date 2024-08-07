import { BaseError } from ".";

class ExistObjectError extends BaseError {
  statusCode = 409;
  constructor(message = "Object is Exist.") {
    super(message);
    Object.setPrototypeOf(this, ExistObjectError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default ExistObjectError;
