import { fetchDb } from "../../utils/notionUtils.js";

export default (async () => {
	const posts = await fetchDb("d9902ef8768848dbbf234936ef74c452");
	const sortedPosts = posts.sort((a, b) => Date.parse(a.date) > Date.parse(b.date));

	return sortedPosts;
})();
