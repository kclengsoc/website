const fs = require("fs");
const NOT_FOUND_PATH = "_site/404.html";

module.exports = function (eleventyConfig) {
	// Copies all files in /src/static into the site"s output
	eleventyConfig.addPassthroughCopy("./src/static/");
	eleventyConfig.addPassthroughCopy("./.htaccess");
	eleventyConfig.addPassthroughCopy("./src/robots.txt");

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

	return {
		dataTemplateEngine: "liquid",
		dir: {
			input: "src", // sets /src as the default input for the website
			includes: "_includes",
			layouts: "_layouts",
		},
	};
};
