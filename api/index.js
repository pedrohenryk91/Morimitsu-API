import { app } from "../dist/server.js";

export default async function handler(req, res) {
  await app.ready();
  app.server.emit("request", req, res);
}