import { BaseError } from ".";

class PermissionDeniedError extends BaseError {
  statusCode = 403;
  constructor(message = "Permission denied.") {
    super(message);
    Object.setPrototypeOf(this, PermissionDeniedError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export default PermissionDeniedError;
