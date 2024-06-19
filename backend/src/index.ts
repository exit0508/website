import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/hello", (c) => {
  return c.json({ msg: "Hello Hono!" });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
