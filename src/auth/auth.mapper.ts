import { UserDocument } from "../types/user.types";

class AuthMapper {
  public toDispaly(userDocument: UserDocument) {
    return {
      id: userDocument.userId,
      firstName: userDocument.firstName,
      lastName: userDocument.lastName,
      email: userDocument.email,
      role: userDocument.role,
      avatar: userDocument.avatar,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt,
    };
  }
}

const authMapper = new AuthMapper();
export default authMapper;
