import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  Client,
  LogLevel,
  isNotionClientError,
  isFullPage,
  isFullPageOrDatabase,
} from "@notionhq/client";
import dotenv from "dotenv";
import { isTextRichTextItemResponse } from "@notionhq/client/build/src/helpers";
import type {
  QueryDatabaseResponse,
  PageObjectResponse,
  GetPageResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

dotenv.config();

const app = new Hono();

const notion = new Client({
  auth: process.env.NOTION_TOKEN as string,
  logLevel: LogLevel.DEBUG,
});
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

interface NotionPostType {
  id: string;
  title: string;
  thumbnail?: string;
  created?: string;
  date?: string;
  tags?: string[];
  lastUpdate?: string;
}

app.get("/hello", (c) => {
  return c.json({ msg: "Hello Hono!" });
});

const fetchAllPosts = async (
  databaseId: string
): Promise<NotionPostType[] | undefined> => {
  let allPosts: PageObjectResponse[] = [];
  let cursor: string | null;
  let hasMore = true;
  try {
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            {
              property: "Published",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      });
      hasMore = response.has_more;
      cursor = response.next_cursor;
      response.results.forEach((post) => {
        if (isFullPage(post)) {
          allPosts.push(post as PageObjectResponse);
        }
      });
      const projectPosts: NotionPostType[] = [];
      allPosts.map((post) => {
        projectPosts.push({
          id: post.id,
          title: getTitle(post),
        });
      });
      //console.log(projectPosts);
      return projectPosts;
    }
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      console.log(error);
    } else {
      return [];
    }
  }
};

//いちいち型制約を書かなくても良いようにしたい
const getTitle = (page: PageObjectResponse): string => {
  console.log(page.properties);
  const title = page.properties.Title;
  return title.type === "title" && title.title.length > 0
    ? title.title[0].plain_text
    : "";
};

app.get("/projects", async (c) => {
  const projects = await fetchAllPosts(DATABASE_ID);
  return c.json({ projects: projects });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
