import fs from "fs/promises";
import { getCategories, getCategoryName } from "../../scripts/categories";
import { getProducts } from "../../scripts/products";

export default async function handler(req, res) {
	const categories = await getCategories();
	const products = await getProducts();
	let foundProducts = [];
	let mainCategory;
	let secondCategory;

	// 1) Loop over categories and take one category
	for (let category of categories) {
		// 1.bis) Check if foundProducts is empty
		if (!foundProducts) {
			foundProducts = {
				id: category.categoryId,
				categoryName: category.categoryName,
				items: [],
			};
		}

		// 2) Find all products that belongs to the first category
		// 2.1) Loop over all products
		for (let product of products) {
			// 2.2) Create a variable that has the first two digits of all productNumbers
			const productCategory = product.productNumber.slice(0, 2);
			const productCategory2 = product.productNumber.slice(0, 3);

			// 2.3) The first category is "01". Compare each product if it belongs to the first category
			if (productCategory === category.categoryId) {
				if (foundProducts.items) {
					foundProducts.items = {
						id: "010",
						categoryName: "test",
						items: [],
					};
				}

				// 2.4) Save all these products to the foundProducts.products array
				foundProducts.items.items.push(product);
			}
			
		}
		// 3) Create a json file and save all found products in it
		const filename = `./inventory/json/${category.categoryName}.json`;
		fs.writeFile(filename, JSON.stringify(foundProducts), (err) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(`File ${filename} created`);
		});
		break;

		// 4) Then continue with the next category
	}

	res.send("Files created");
}
