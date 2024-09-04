import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import logger from "./logger.js";

import dotenv from "dotenv";
dotenv.config();

const notion = new Client({
	auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function fetchDb(databaseId) {
	logger(`Querying Notion database ${databaseId}`, "info");

	const res = await notion.databases.query({
		database_id: databaseId,
		filter: {
			property: "Published",
			checkbox: {
				equals: true,
			},
		},
		sorts: [
			{
				property: "Date",
				direction: "ascending",
			},
		],
	});

	const postBlocks = res?.results ?? null;

	if (postBlocks === null) throw `400 error while fetching posts for database ${databaseId}`;

	logger(`Found ${postBlocks.length} posts from database ${databaseId}`, "info");

	/**
	 * @typedef {object} Post
	 * @property {string} title - Title of the post
	 * @property {string} date - Date of publication
	 * @property {string} author - Name of the author
	 * @property {boolean} published - Whether or not the post is published
	 * @property {string} content - Content of the post in Markdown format
	 */
	/**
	 * @type {Array<Post>}
	 */
	const pageObjects = [];

	const promises = [];
	postBlocks.forEach((p) => promises.push(fetchPost(p).then((pageObj) => {
		logger(`Fetched post with title ${pageObj.title} from database ${databaseId}`, "info");
		pageObjects.push(pageObj);
	})));

	await Promise.all(promises);

	return pageObjects;
}

export async function fetchPageAsMarkdown(pageId) {
	logger(`Querying Notion for page ID ${pageId}`, "info");
	const mdBlocks = await n2m.pageToMarkdown(pageId);
	const mdString = n2m.toMarkdownString(mdBlocks);

	logger(`Fetched page with ID ${pageId}`, "info");
	return mdString.parent;
}

async function fetchPost(post) {
	const mdBlocks = await n2m.pageToMarkdown(post.id);
	const mdString = n2m.toMarkdownString(mdBlocks);
	const author = await notion.users.retrieve({ user_id: post.created_by.id });

	let title;

	if (post.properties["Title"].title.length > 0) {
		let joinedTitle = "";
		for (const t of post.properties["Title"].title) {
			joinedTitle += t["plain_text"]
		}

		title = joinedTitle;
	} else {
		title = post.properties["Date"].date.start;
	}

	const thePage = {
		title: title,
		date: post.properties["Date"].date.start,
		author: author.name ?? "Unknown",
		published: true,
		content: mdString.parent,
	};

	if (post.properties["Location"]?.["rich_text"].length > 0) {
		let joinedLocation = "";
		for (const l of post.properties["Location"]["rich_text"]) {
			joinedLocation += l["plain_text"]
		}

		thePage.location = joinedLocation;
	} else {
		thePage.location = null;
	}

	return thePage;
}
