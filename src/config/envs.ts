import "dotenv/config";
import { get } from "env-var";

/**
 * Config file for the environment variables.
 * Handling the config of env vars this way allows us to not use dotenv and env-var in other parts
 * of the codebase, so that we can easily change the way the environment variables are defined anytime only
 * by updating one file.
 *
 * This is an adapter.
 */

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
};
