import fs from "fs";

export default async function getCategories() {
	let categories = [];
	fs.readFile("./inventory/BK04-categories.csv", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		for (let row of data.split("\n")) {
			const rowItems = row.split(" ");
			categories.push(rowItems[0].toString());
		}
		console.log(categories);
		return categories;
	});
}
