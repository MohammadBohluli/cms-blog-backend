import nodemailer, { SendMailOptions } from "nodemailer";
import { logger } from ".";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
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
