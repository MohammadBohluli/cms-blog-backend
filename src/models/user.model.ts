import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import bcrypt from "bcrypt";
import { UserRole } from "../types/user.types";
import { logger } from "../utils";

@modelOptions({
  schemaOptions: { _id: false },
  options: { allowMixed: Severity.ALLOW },
})
class ResetCode {
  @prop({ default: null })
  public code!: string | null;

  @prop({ default: null })
  public expireAt!: Date | null;
}

export interface UserSchema extends Base {}

// Hooks
@pre<UserSchema>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;

    next();
  } catch (err) {
    logger.error(err);
  }
})
@modelOptions({ schemaOptions: { collection: "users", id: false } })
export class UserSchema extends TimeStamps {
  @prop({ required: true, minlength: 3, maxlength: 155 })
  public firstName!: string;

  @prop({ required: true, minlength: 3, maxlength: 155 })
  public lastName!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: true, minlength: 8 })
  public password!: string;

  @prop({ default: false })
  public verified!: boolean;

  @prop({ enum: () => UserRole, default: UserRole.USER, required: true })
  public role!: UserRole;

  @prop({ type: () => ResetCode })
  public verificationCode!: ResetCode;

  @prop({ type: () => ResetCode })
  public passwordResetCode!: ResetCode;

  // virtual methods
  public get userId() {
    return this._id.toHexString();
  }
}

export const UserModel = getModelForClass(UserSchema);
