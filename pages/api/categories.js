import fs from "fs";
import { getProducts } from "../../scripts/products";

export default async function handler(req, res) {
	let categories = [];
	let products = await getProducts();
	let groupedProducts = {};

	// Group the products by category
	for (let product of products) {
		const productCategory = product.productNumber.toString().slice(0, 2);
		if (!groupedProducts[productCategory]) {
			groupedProducts[productCategory] = [];
		}
		groupedProducts[productCategory].push(product);
	}

	// Write each category to its own file
	for (let category in groupedProducts) {
		const filename = `./inventory/BK${category}.json`;
		const categoryProducts = groupedProducts[category];

		fs.writeFile(filename, JSON.stringify(categoryProducts), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(`File ${filename} created`);
		});
	}

	res.send("Files created");
}
