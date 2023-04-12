import { getCategories } from "@/scripts/categories";
import { getProducts } from "@/scripts/products";
import fs from "fs/promises";

export default async function handler(req, res) {
	const categories = await getCategories();
	const products = await getProducts();

	const getNextPrefixLength = (prefix) =>
		// Needed because level 3 has 5 chars
		prefix.length + (prefix.length === 3 ? 2 : 1);

	const getCategoriesByPrefix = (idPrefix) =>
		categories.filter(
			({ categoryId }) =>
				categoryId.length === getNextPrefixLength(idPrefix) &&
				categoryId.startsWith(idPrefix)
		);

	const getGroupedCategoryRecursively = ({ categoryId: id, categoryName }) => ({
		id,
		categoryName,
		items: getCategoriesByPrefix(id).map(getGroupedCategoryRecursively),
	});

	const result = getCategoriesByPrefix("0").map(getGroupedCategoryRecursively);

    console.log(result)

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
