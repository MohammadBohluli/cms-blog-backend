import { UserDocument } from "../user.types";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}
