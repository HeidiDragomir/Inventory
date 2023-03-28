import fs from "fs/promises";

export async function getProducts() {
	var productsNew = [];

	try {
		const data = await fs.readFile("./inventory/Vilmabas-artiklar.csv", "utf8");
		for (let row of data.split("\n")) {
			const rowItems = row.split(";");
			productsNew.push(rowItems[3]);
		}
		// console.log(productsNew);
        return productsNew;
	} catch (error) {
		console.error(error);
	}
}
// getProducts();
