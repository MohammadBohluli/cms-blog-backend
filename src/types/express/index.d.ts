import { UserDocument } from "../user.types";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      // Server
      NODE_ENV: string;
      PORT: number;
      STATIC_FILE_ADDRESS: string;
      // Database
      MONGO_USERNAME: string;
      MONGO_PASSWORD: string;
      MONGO_HOSTNAME: string;
      MONGO_PORT: number;
      MONGO_DB: string;
      // SMTP
      EMAIL_USER: string;
      EMAIL_PASSWORD: string;
      // Tokens
      ACCESS_TOKEN_SECRET_KEY: string;
      REFRESH_TOKEN_SECRET_KEY: string;
      ACCESS_TOKEN_LIFETIME: number;
      REFRESH_TOKEN_LIFETIME: number;
    }
  }
}
