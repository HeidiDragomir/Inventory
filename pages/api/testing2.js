import fs from "fs/promises";
import { getCategories, getCategoryName } from "../../scripts/categories";
import { getProducts } from "../../scripts/products";

export default async function handler(req, res) {
	const categories = await getCategories();
	const products = await getProducts();
	let foundProducts = [];
	// const getCategoryName = (id, categories) => {
	// 	const category_ = categories.find((cat) => cat.categoryId === id);
	// 	return category_.categoryName;
	// };

	// 	for (let category of categories) {
	// 		let mainCategory = category.categoryId.slice(0, 2);
	// 		for (let product of products) {
	// 			const categoryProduct = product.productNumber.slice(0, 2);
	// 			if (categoryProduct === mainCategory) {
	// 				foundProducts.push(product);
	// 			}
	// 		}
	// const filename = `./inventory/json/01.json`;
	// 	fs.writeFile(filename, JSON.stringify(foundProducts), (err) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return;
	// 		}
	// 		console.log(`File ${filename} created`);
	// 	});
	// 		break
	// 	}

	// 1) Loop over categories and take one category
	for (let category of categories) {
		let mainCategory;
		if (category.categoryId.length === 2) {
			mainCategory = category.categoryId;
			foundProducts = {
				id: mainCategory,
				categoryName: category.categoryName,
				products: [],
			};

			// 2) Find all products that belongs to the first category
			// 2.1) Loop over all products
			for (let product of products) {
				// 2.2) Create a variable that has the first two digits of all productNumbers
				const productCategory = product.productNumber.slice(0, 2);

				// 2.3) The first category is "01". Compare each product if it belongs to the first category
				if (productCategory === mainCategory) {
					// 2.4) Save all these products to the foundProducts array
					foundProducts.products.push(product);
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
		}
	}
	
	// 4) Then continue with the next category

	
	res.send("Files created");
}
