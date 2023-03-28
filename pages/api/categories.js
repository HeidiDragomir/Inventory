import fs from "fs";
import { getProducts } from "../../scripts/products";

export default function handler(req, res) {
	let categories = [];
	// let products = ["01910", "03404", "0510", "20603"];
	let foundProducts = [];
	var products = getProducts();

	fs.readFile("./inventory/BK04-categories.csv", "utf8", (err, data) => {
		if (err) {
			console.error("Heidi");
			return;
		}
		console.log(products);
		for (let row of data.split("\n")) {
			const rowItems = row.split(" ");
			categories.push(rowItems[0].toString());
		}
		// res.send(categories);
		// loop through all categories
		for (const category of categories) {
			// loop through all products
			products.forEach((product) => {
				// check if product belongs to category
				if (product === category) {
					// if yes save it in a variable
					foundProducts.push(product);
				}
			});
			// for (const product of products) {
			// 	// check if product belongs to category
			// 	if (product === category) {
			// 		// if yes save it in a variable
			// 		foundProducts.push(product);
			// 	}
			// }
		}

		// When all products are looped through save the found ones to a file
		fs.appendFile(
			"./inventory/test.json",
			JSON.stringify(foundProducts),
			(err) => {
				if (err) {
					console.error(err);
					return;
				}
				res.send("file updated");
			}
		);

		// res.send(foundProducts);
	});
}
