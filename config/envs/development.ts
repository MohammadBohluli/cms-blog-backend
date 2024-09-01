import defineConfig from "../defineConfig";

const createDevConfig = function () {
  return defineConfig({
    PORT: 3000,
    database: {
      MONGO_USERNAME: "",
      MONGO_PASSWORD: "",
      MONGO_HOSTNAME: "192.168.1.4",
      MONGO_PORT: 27017,
      MONGO_DB: "cms-blog-db",
    },
  });
};

export default createDevConfig;
