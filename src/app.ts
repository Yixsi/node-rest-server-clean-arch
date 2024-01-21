import { envs } from "./config";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // await for database connection

  // start server
  console.log("Starting server...");
  new Server({
    port: envs.PORT,
  }).start();
}
