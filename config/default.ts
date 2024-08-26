export default {
  port: 3000,
  dbURI: "mongodb://192.168.1.4:27017/cms-blog-db",
  accessTokenSecretKey: "your_access_Token_Secret_Key",
  refreshTokenSecretKey: "your_refresh_Token_Secret_Key",
  smtp: {
    user: "bal6v4mjdoztxqyx@ethereal.email",
    password: "9tx57vsV6fC8477K31",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
  staticAddress: "http://localhost:3000/images/",
};
