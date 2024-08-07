import { NotFoundError } from "../errors";
import { UserModel } from "../models/user.model";
import { UserDocument } from "../types/user.types";
import { RegisterSchema, UpdateUserSchema } from "./schema/auth.schema";

class AuthRepo {
  public async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) throw new NotFoundError("User not found.");
    return user;
  }

  public async getUserById(userId: string): Promise<UserDocument> {
    const user = await UserModel.findById(userId);
    if (!user) throw new NotFoundError("User not found.");
    return user;
  }

  public async createUser(user: RegisterSchema): Promise<UserDocument> {
    const createdUser = await UserModel.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      passwordResetCode: { code: null, expireAt: null },
      verificationCode: { code: null, expireAt: null },
    });
    return createdUser;
  }

  public async updateUserById(
    userId: string,
    updateField: UpdateUserSchema
  ): Promise<UserDocument> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { firstName: updateField.firstName, lastName: updateField.lastName },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    );
    if (!updatedUser)
      throw new NotFoundError("User not found or somthing wrong in update.");
    return updatedUser;
  }

  public async deleteUserById(userId: string): Promise<void> {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) throw new NotFoundError("User not found.");
  }
}

const authRepo = new AuthRepo();
export default authRepo;
