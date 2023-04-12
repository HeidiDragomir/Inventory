import { getCategories } from "@/scripts/categories";
import { getProducts } from "@/scripts/products";
import fs from "fs/promises";

export default async function handler(req, res) {
	const categories = await getCategories();
	const products = await getProducts();

	const catalog = categories.reduce(
		(r, { categoryId, categoryName }) => {
			let i = categoryId.length;
			do {
				const key = categoryId.slice(0, i);
				if (key in r) {
					(r[key].items ??= []).push(
						(r[categoryId] = { categoryId, categoryName })
					);
					return r;
				}
			} while (--i);
			r.items.push((r[categoryId] = { categoryId, categoryName }));
			return r;
		},
		{ items: [] }
	);

	products.forEach((o) => (catalog[o.productNumber].product ??= []).push(o));

	console.log(catalog.items);

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
