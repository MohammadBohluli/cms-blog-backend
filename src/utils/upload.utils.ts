import fs from "node:fs";
import path from "node:path";
import logger from "./logger.utils";

class UploadImage {
  public uniqImageName: string;
  public imagePath: string;

  constructor(public file: Express.Multer.File) {
    this.file = file;
    this.uniqImageName = this.normalaizeImgUrl();
    this.imagePath = this.generateImgPath();
  }

  private normalaizeImgUrl() {
    return crypto.randomUUID().split("-")[0] + "-" + this.file.originalname;
  }

  private generateImgPath() {
    return path.join(__dirname, "../../images", this.uniqImageName);
  }

  public saveToStorage() {
    const dir = path.join(__dirname, "../../images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile(this.imagePath, this.file.buffer, (error) => {
      if (error) logger.error(error.message);
      logger.info("✅ image successfully saved.");
    });
  }

  public static deleteFromStorage(imageUrl: string) {
    const imgPath = imageUrl ? imageUrl.split("/images/")[1] : "";
    fs.unlink(path.join(__dirname, "../../images", imgPath), (error) => {
      if (error) {
        logger.error(error.message);
      } else {
        logger.info("✅ image successfully deleted.");
      }
    });
  }
}

export default UploadImage;
