import config from "config";
import nodemailer, { SendMailOptions } from "nodemailer";
import { logger } from ".";
import Smtp from "../types/smtp.types";

const smtp = config.get<Smtp>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.password,
  },
});

const sendMail = async function (payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err);
      return;
    }

    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
};

export default sendMail;
