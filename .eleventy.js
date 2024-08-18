const fs = require("fs");
const path = require("path");
const NOT_FOUND_PATH = "_site/404.html";
const browserslist = require("browserslist");
const { bundle, browserslistToTargets, composeVisitors } = require("lightningcss");

module.exports = function (eleventyConfig) {
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
