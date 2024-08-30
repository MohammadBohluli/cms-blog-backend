import multer from "multer";
import { InvalidError } from "../errors";

// TODO: add limit size upload file
const multerConfig = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    const allowedFileType = ["image/jpg", "image/jpeg", "image/png"];

    if (allowedFileType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // FIXME: create Error badrequest
      cb(new InvalidError("Image foramt must be jpg, jpeg, png"));
    }
  },
});

export default multerConfig;
