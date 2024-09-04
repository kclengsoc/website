import { fetchPageAsMarkdown } from "../../utils/notionUtils.js";

export default (async () => {
	const pageString = await fetchPageAsMarkdown("6018d45db8eb41c3be00654fe518873d");

	return pageString;
})();
