import fs from "fs";
import path from "path";
const NOT_FOUND_PATH = "_site/404.html";
import browserslist from "browserslist";
import { bundle, browserslistToTargets, composeVisitors } from "lightningcss";
// import NotionCMS, { Head, Linker, Images } from "@agency-kit/notion-cms";

export default async function (eleventyConfig) {
	// const notion = new NotionCMS({
	// 	databaseId: "179fbf14-0f98-4ba1-b32d-f88f2fa5eb0b",
	// 	notionAPIKey: process.env.NOTION_API_KEY,
	// 	localCacheDirectory: `${process.cwd()}/lc/`, // Defaults to tucked in node_modules, but put it anywhere
	// 	draftMode: true, // turn off for PROD
	// 	plugins: [
	// 		Head(),
	// 		Linker(),
	// 		Images(),
	// 		// Custom NotionCMS plugin: see https://www.agencykit.so/notion-cms/plugins/building-a-plugin/
	// 		{
	// 			name: 'layouts',
	// 			hook: 'during-tree',
	// 			exec: pageContent => {
	// 				let layoutString = pageContent?.otherProps?.Layout?.rich_text[0]?.text?.content || "default"
	// 				// Slugify
	// 				layoutString.toLowerCase()
	// 					.replace(/[^\w-]+/g, '')
	// 					.replace(/ +/g, '-');
	// 				Object.assign(pageContent, { Layout: `layouts/${layoutString}.liquid` })
	// 				return pageContent
	// 			}
	// 		}],
	// });

	// await notion.pull();

	// const pageCollection = new Set();
	// notion.walk((node) => {
	// 	// guarantee unique collection names, even if a page's slug is not unique
  //   // for manual collection usage, you may want to remove this as it makes accessing the collection by the slug difficult.
  //   // Just make sure you don't use identical page names in your db 😉
  //   const collectionName = `${node.slug}-${simpleHash(node.id)}`;
  //   node.collectionName = collectionName;

  //   // for quickly building all pages in the db, we collect them all.
  //   pageCollection.add(node);

  //   // We want only the current path's pages
  //   const pages = notion.filterSubPages(node.path);

  //   // We only want collections when there are items in it ie not a leaf node, for individual collections
  //   if (pages.length) {
  //     navCollection.add(node);
  //     config.addCollection(collectionName, () => pages);
  //   }
	// });

	// eleventyConfig.addCollection('combined', () => Array.from(pageCollection).flatMap(page => page));


	// Copies all files in /src/static into the site"s output
	eleventyConfig.addPassthroughCopy("./src/static/");
	eleventyConfig.addPassthroughCopy("./.htaccess");
	eleventyConfig.addPassthroughCopy("./src/robots.txt");
	eleventyConfig.addPassthroughCopy("./CNAME");

	eleventyConfig.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
	});

	// 404 page
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, bs) {
				bs.addMiddleware("*", (req, res) => {
					if (!fs.existsSync(NOT_FOUND_PATH)) {
						throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
					}

					const content_404 = fs.readFileSync(NOT_FOUND_PATH);
					// Add 404 http status code in request header.
					res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
					// Provides the 404 content without redirect.
					res.write(content_404);
					res.end();
				});
			},
		},
	});

	// Process CSS into one file
	eleventyConfig.addTemplateFormats("css");
	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		compile: async function(_inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) return;

			let targets = browserslistToTargets(browserslist("> 0.2% and not dead"));

			return async () => {
				let { code } = await bundle({
					filename: inputPath,
					minify: true,
					sourceMap: false,
					targets,
				});

				return code
			};
		},
	});

	// Create event collections
	eleventyConfig.addCollection("futureEvents", (collection) => {
		const today = new Date();
		return collection.getFilteredByTags("event").filter((e) => new Date(e.date) > today);
	});

	eleventyConfig.addCollection("pastEvents", (collection) => {
		const today = new Date();
		return collection.getFilteredByTags("event").filter((e) => new Date(e.date) < today);
	});

	return {
		dataTemplateEngine: "liquid",
		dir: {
			input: "src", // sets /src as the default input for the website
			includes: "_includes",
			layouts: "_layouts",
		},
	};
};


function simpleHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 6);
}
