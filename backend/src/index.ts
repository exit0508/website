import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Client, LogLevel } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

const notion = new Client({
  auth: process.env.NOTION_TOKEN as string,
  logLevel: LogLevel.DEBUG,
});
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

console.log("aaaa", DATABASE_ID);

app.get("/hello", (c) => {
  return c.json({ msg: "Hello Hono!" });
});

const Projects = await notion.databases.query({
  database_id: DATABASE_ID,
});

app.get("/projects", (c) => {
  return c.json({ projects: Projects });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
