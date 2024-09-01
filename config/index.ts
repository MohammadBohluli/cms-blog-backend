import createDevConfig from "./envs/development";

const getConfig = function () {
  switch (process.env.APP_ENV) {
    case "development":
      return createDevConfig();

    default:
      throw new Error(`Invalid APP_ENV "${process.env.APP_ENV}"`);
  }
};

const appConfig = getConfig();

export default appConfig;
