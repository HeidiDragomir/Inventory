import fs from "fs/promises";

export async function getCategories() {
	let categories = [];

	try {
		const data = await fs.readFile(
			"./inventory/csv/BK04-categories.csv",
			"utf8"
		);
		for (let row of data.split("\n")) {
			const rowItems = row.split(/\s+(.*)/);
			categories.push({
				category: rowItems[0],
				categoryName: rowItems[1].replace(/;/g, ""),
			});
		}
		return categories;
	} catch (error) {
		console.error(error);
	}
	
}
