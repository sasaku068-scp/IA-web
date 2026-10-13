//#region node_modules/.nitro/vite/services/ssr/assets/text-DDWQqcvQ.js
function splitBlocks(source) {
	const parts = [];
	const re = /```([\w-]*)\n?([\s\S]*?)```/g;
	let last = 0;
	for (const match of source.matchAll(re)) {
		const index = match.index ?? 0;
		if (index > last) parts.push({
			type: "text",
			content: source.slice(last, index)
		});
		parts.push({
			type: "code",
			lang: match[1] ?? "",
			content: (match[2] ?? "").replace(/\n$/, "")
		});
		last = index + match[0].length;
	}
	if (last < source.length) parts.push({
		type: "text",
		content: source.slice(last)
	});
	if (parts.length === 0) parts.push({
		type: "text",
		content: source
	});
	return parts;
}
function formatWhen(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat("fr-FR", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	}).format(date);
}
function isHttpsUrl(value) {
	return typeof value === "string" && value.startsWith("https://");
}
//#endregion
export { isHttpsUrl as n, splitBlocks as r, formatWhen as t };
