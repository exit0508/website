import { Client, LogLevel } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN as string,
  logLevel: LogLevel.DEBUG,
});
const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID as string;

console.log(notion, DATABASE_ID);

export default async function fetchAllPosts() {
  try {
    if (notion) {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
      });
      return response.results;
    }
    return;
  } catch (error) {
    return error;
  }
}
