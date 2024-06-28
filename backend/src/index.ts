import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handle } from "hono/vercel";
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

export const runtime = "edge";
const app = new Hono().basePath("/projects");

const notion = new Client({
  auth: process.env.NOTION_TOKEN as string,
  logLevel: LogLevel.DEBUG,
});
const DATABASE_ID = process.env.NOTION_DATABASE_ID as string;

interface NotionPostType {
  id: string;
  title: string;
  thumbnail?: string;
  projectDate?: string;
  tags?: string[];
  publicLink?: string;
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
          thumbnail: getThumbnailUrl(post),
          projectDate: getProjectDate(post),
          tags: getTags(post),
          publicLink: getPublicLink(post),
        });
      });
      //console.log("aaa", projectPosts);
      return projectPosts;
      //return response.results;
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
  const title = page.properties.Title;
  return title.type === "title" && title.title.length > 0
    ? title.title[0].plain_text
    : "";
};

const getThumbnailUrl = (page: PageObjectResponse): string => {
  const thumbnailUrl = page.properties.Thumbnail;
  if (thumbnailUrl.type === "files" && thumbnailUrl.files.length > 0) {
    switch (thumbnailUrl.files[0].type) {
      case "external":
        return thumbnailUrl.files[0].external.url;
      case "file":
        return thumbnailUrl.files[0].file.url;
    }
  }
  return ""; // デフォルトの返り値
};

const getTags = (page: PageObjectResponse): string[] => {
  const tags = page.properties.Tags;
  return tags.type === "multi_select" && tags.multi_select.length > 0
    ? tags.multi_select.map((val) => val.name)
    : [];
};

const getProjectDate = (page: PageObjectResponse): string => {
  const projectDate = page.properties.Date;
  return projectDate.type === "rich_text" &&
    projectDate.rich_text[0].type === "text"
    ? projectDate.rich_text[0].text.content
    : "";
};

const getPublicLink = (page: PageObjectResponse): string => {
  const Url = page.public_url;
  if (Url) {
    return Url;
  } else {
    return "";
  }
};

app.get("/projects", async (c) => {
  const projects = await fetchAllPosts(DATABASE_ID);
  return c.json(projects);
});

// const port = 3000;
// console.log(`Server is running on port ${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

export const GET = handle(app);
export const POST = handle(app);
