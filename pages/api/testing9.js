import { getCategories } from "@/scripts/categories";
import { getProducts } from "@/scripts/products";
import fs from "fs/promises";

export default async function handler(req, res) {
	const categories = await getCategories();
	const products = await getProducts();

	function hierarchy(categories, products) {
		function parent(s) {
			while (!map.has(s)) s = s.slice(0, -1);
			return map.get(s);
		}
		const root = { items: [] };
		const map = new Map(
			categories.map(({ categoryId: id, ...rest }) => [id, { id, ...rest }])
		).set("", root);
		for (const cat of categories) {
			(parent(cat.categoryId.slice(0, -1)).items ??= []).push(
				map.get(cat.categoryId)
			);
		}
		for (const prod of products) {
			(parent(prod.productNumber).products ??= []).push(prod);
		}
		return root.items;
	}

	const forest = hierarchy(categories, products);
	console.log(forest);

	//  let groupedProducts = process()

	// const filename = `./inventory/json/01.json`;
	// 			fs.writeFile(filename, JSON.stringify(groupedProducts), (err) => {
	// 				if (err) {
	// 					console.error(err);
	// 					return;
	// 				}
	// 				console.log(`File ${filename} created`);
	// 			});

	res.send("Files created");
}
