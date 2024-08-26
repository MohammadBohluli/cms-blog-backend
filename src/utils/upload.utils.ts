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
    return new Date().toISOString() + "-" + this.file.originalname;
  }

  private deNormalaizeImgUrl(imgUrl: string) {
    return imgUrl.split("/images/")[1];
  }

  private generateImgPath() {
    return path.join(__dirname, "../../images", this.uniqImageName);
  }

  public saveToStorage() {
    fs.writeFile(this.imagePath, this.file.buffer, (error) => {
      if (error) logger.error(error.message);
      logger.info("✅ image successfully saved.");
    });
  }

  public deleteFromStorage(imageUrl: string) {
    fs.unlink(
      path.join(__dirname, "../../images", this.deNormalaizeImgUrl(imageUrl)),
      (error) => {
        if (error) logger.error(error.message);
        logger.info("✅ image successfully deleted.");
      }
    );
  }

  public updateFromStorage(imageUrl: string) {
    this.deleteFromStorage(imageUrl);
    this.saveToStorage();
  }
}

export default UploadImage;
