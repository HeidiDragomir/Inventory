import fs from "fs/promises";
import { getCategories, getCategoryName } from "../../scripts/categories";
import { getProducts } from "../../scripts/products";

export default async function handler(req, res) {
	let categories = await getCategories();
	let products = await getProducts();
	const getCategoryName = (id, categories) => {
		const category = categories.find((cat) => cat.category === id);
		return category.categoryName;
	};

	// Group the products by category
	let groupedProducts = {};

	for (let product of products) {
		const category = product.productNumber.toString().slice(0, 2);
		const subcategory = product.productNumber.toString().slice(0, 3);
		const subsubcategory = product.productNumber.toString();
		// const productId = product.productNumber.toString();

		// Step 1: --> group all products by category
		// "01" -- groupedProducts[category]

		if (!groupedProducts[category]) {
			groupedProducts[category] = {
				id: category,
				categoryName: "",
				items: [],
			};
		}
		// result --> { id: '21', categoryName: '', items: [] }

		// Step 2: --> find all products after subcategory
		// "010" -- groupedProducts[category].items
		let subcategoryObj = groupedProducts[category].items.find(
			(subcat) => subcat.id === subcategory
		);

		if (!subcategoryObj) {
			subcategoryObj = {
				id: subcategory,
				categoryName: "",
				items: [],
			};
		}

		// result --> { id: '010', categoryName: '', items: [] }

		// add all products by subcategory to "01" products array
		groupedProducts[category].items.push(subcategoryObj);

		// Step 3: --> find all products after subsubcategory
		// "01001" -- groupedProducts[category].items[subcategory].items
		let subsubcategoryObj = subcategoryObj.items.find(
			(subsubcat) => subsubcat.id === subsubcategory
		);

		if (!subsubcategoryObj) {
			subsubcategoryObj = {
				id: subsubcategory,
				categoryName: "",
				products: [],
			};
		}

		// result --> { id: '01001', categoryName: '', products: [] }

		// add all products by subsubcategory to "010" items array
		subcategoryObj.items.push(subsubcategoryObj);

		// Step 4: --> find all products by productNumber
		// "0100101" -- groupedProducts[category].items[subcategory].items[subsubcategory].products

		let productObj = subsubcategoryObj.products.find(
			(prod) => prod.productNumber === product.productNumber
		);

		if (!productObj) {
			productObj = {
				productNumber: product.productNumber,
				productName: product.productName,
			};
		}
		// add all products by productNumber to "01001" products array
		subsubcategoryObj.products.push(productObj);
	}
	console.log("groupedProducts", groupedProducts);

	// THE PROBLEM IS HERE IN THIS PART
	// Write each category to its own file
	// let categoriesData = {};

	// for (let category in groupedProducts) {
	// 	const categoryName = getCategoryName(category, categories);
	// 	const categoryData = {
	// 		id: category,
	// 		categoryName: categoryName,
	// 		items: groupedProducts[category].items,
	// 	};

	// 	for (let subcategory of categoryData.items) {
	// 		const subcategoryName = getCategoryName(subcategory.id, categories);
	// 		const subcategoryData = {
	// 			id: subcategory.id,
	// 			categoryName: subcategoryName,
	// 			items: subcategory.items,
	// 		};

	// 		for (let subsubCategory of subcategoryData.items) {
	// 			const subsubCategoryName = getCategoryName(
	// 				subsubCategory.id,
	// 				categories
	// 			);
	// 			const subsubCategoryData = {
	// 				id: subsubCategory.id,
	// 				categoryName: subsubCategoryName,
	// 				products: subsubCategory.products,
	// 			};
	// 			// console.log("subsubCategoryData", subsubCategoryData)
	// 		}

	// 		// console.log("subcategoryData.items", subcategoryData)
	// 	}
	// 	console.log("categoryData.items", categoryData);

	// 	const filename = `./inventory/json/${categoryName}.json`;
	// 	const fileData = JSON.stringify(categoriesData[categoryName]);

	// 	fs.writeFile(filename, fileData, (err) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return;
	// 		}
	// 		console.log(`File ${filename} created`);
	// 	});
	// }

	res.send("Files created");
}
