import { AppConfig, appConfigSchema } from "./types";

const defineConfig = function (config: AppConfig) {
  return appConfigSchema.parse(config);
};
export default defineConfig;
