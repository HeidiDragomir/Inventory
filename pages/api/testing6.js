import { getCategories } from "@/scripts/categories";
import { getProducts } from "@/scripts/products";
import fs from "fs/promises";

export default async function handler(req, res) {
	const categories = await getCategories();
	const products = await getProducts();
	// let categoryName;

	function items(cid, level) {
		return categories
			.filter(
				(c) => c.categoryId.startsWith(cid) && c.categoryId.length === level
			)
			.map(process);
	}

	// console.log(items("01", 2));
	function process(cat) {
		let cid = cat?.categoryId || "";
		// let categoryName = cat?.categoryName;
		// console.log(categoryName)

		switch (cid.length) {
			case 0:
				return { ...cat, items: items(cid, 2) };
			case 2:
				return { ...cat, items: items(cid, 3) };
			case 3:
				return { ...cat, items: items(cid, 5) };
			case 5:
				return {
					...cat,
					products: products.filter((p) => p.productNumber.startsWith(cid)),
				};
		}
	}
	console.log(items("01", 2));
	// console.log(categoryName)
	// let groupedProducts = process();
	// console.log(groupedProducts);

	// const filename = `./inventory/json/${categoryName}.json`;

	// fs.writeFile(filename, JSON.stringify(items("01", 2)), (err) => {
	// 	if (err) {
	// 		console.error(err);
	// 		return;
	// 	}
	// 	console.log(`File ${filename} created`);
	// });

	res.send("Files created");
}
