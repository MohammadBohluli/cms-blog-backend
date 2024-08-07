import { DocumentType } from "@typegoose/typegoose";
import { UserSchema } from "../models/user.model";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type UserDocument = DocumentType<UserSchema>;
