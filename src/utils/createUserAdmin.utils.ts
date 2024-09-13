import { UserModel } from "../models/user.model";
import logger from "./logger.utils";

const createUserAdmin = async function () {
  if (process.env.NODE_ENV === "development") {
    const isExistUser = UserModel.findOne({ email: "admin@gmail.com" });

    if (!(await isExistUser)) {
      const user = new UserModel({
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: "admin1234",
        verified: true,
        role: "admin",
      });
      await user.save();
      logger.info("✅ User admin is created");
    }
  }
};
export default createUserAdmin;
