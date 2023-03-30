import fs from "fs";
import { getProducts } from "../../scripts/products";

export default async function handler(req, res) {
	let products = await getProducts();
	// let productCategory
	let groupedProducts = {};

	// Group the products by category
	for (let product of products) {
		const productCategory = product.productNumber.toString().slice(0, 2);
		const productCategory2 = product.productNumber.toString().slice(0, 3);

		if (!groupedProducts[productCategory]) {
			groupedProducts[productCategory] = {};
		}

		if (!groupedProducts[productCategory][productCategory2]) {
			groupedProducts[productCategory][productCategory2] = {};
		}

		const productNumber = product.productNumber.toString();
		if (!groupedProducts[productCategory][productCategory2][productNumber]) {
			groupedProducts[productCategory][productCategory2][productNumber] = [];
		}

		groupedProducts[productCategory][productCategory2][productNumber].push(
			product
		);
	}

	console.log(groupedProducts);

	// Write each category to its own file
	for (let category in groupedProducts) {
		const filename = `./inventory/BK${category}.json`;
		const categoryProducts = [];

		for (let subCategory in groupedProducts[category]) {
			const subCategoryProducts = [];
			const productsByNumber = groupedProducts[category][subCategory];

			for (let subsubCategory in productsByNumber) {
				subCategoryProducts.push({
					subsubCategory,
					products: productsByNumber[subsubCategory],
				});
			}

			categoryProducts.push({
				subCategory,
				products: subCategoryProducts,
			});
		}

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
