import { fetchDb } from "../../utils/notionUtils.js";

export default (async () => {
	const events = await fetchDb("0e93470406374236844c6c3a1722fb85");
	const sortedEvents = events.sort((a, b) => Date.parse(a.date) > Date.parse(b.date));

	return sortedEvents;
})();
