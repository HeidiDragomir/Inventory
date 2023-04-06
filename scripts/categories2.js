import fs from "fs/promises";

export async function getCategories() {
	let categories = [];
	let mainCategory = [];
	let secondCategory = [];
	let thirdCategory = [];

	try {
		const data = await fs.readFile(
			"./inventory/csv/BK04-categories.csv",
			"utf8"
		);
		if (categories) {
			categories = {
				mainCategory: mainCategory,
				secondCategory: secondCategory,
				thirdCategory: thirdCategory,
			};
		}
		for (let row of data.split("\n")) {
			const rowItems = row.split(/\s+(.*)/);
			if (rowItems[0].length === 2) {
				categories.mainCategory.push({
					categoryId: rowItems[0],
					categoryName: rowItems[1].replace(/;/g, ""),
				});
			} 
			else if (rowItems[0].length === 3) {
				categories.secondCategory.push({
					categoryId: rowItems[0],
					categoryName: rowItems[1].replace(/;/g, ""),
				});
			} else if (rowItems[0].length === 5) {
				categories.thirdCategory.push({
					categoryId: rowItems[0],
					categoryName: rowItems[1].replace(/;/g, ""),
				});
			}
		}
		return categories;
	} catch (error) {
		console.error(error);
	}
}
