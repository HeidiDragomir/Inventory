import fs from "fs/promises";

export async function getProducts() {
	let products = [];

	try {
		const data = await fs.readFile("./inventory/csv/Basta-inventory.csv", "utf8");
		for (let row of data.split("\n")) {
			const rowItems = row.split(";");
			if (rowItems[4].length < 5) {
				products.push({
					productNumber: 0 + rowItems[4],
					productName: rowItems[0],
				});
			} else {
				products.push({
					productNumber: rowItems[4],
					productName: rowItems[0],
				});
			}
		}

		return products;
	} catch (error) {
		console.error(error);
	}
}
