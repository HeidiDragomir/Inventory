import fs from "fs";

async function getCategories(filePath) {
	try {
		const data = await fs.promises.readFile(filePath, "utf8");
		const categories = data.split("\n");
		return categories;
	} catch (err) {
		console.error(err);
	}
}

async function getProducts(filePath) {
	try {
		const data = await fs.promises.readFile(filePath, "utf8");
		const products = data.split("\n");
		return products;
	} catch (error) {
		console.error(error);
	}
}

export default async function handler(req, res) {
	const categories = await getCategories("./inventory/BK04-categories.csv");
	const products = await getProducts("./inventory/Vilmabas-artiklar.csv");
	console.log("categories", categories);
	console.log("products", products);
	res.status(200).write(categories.toString());
	res.status(200).write(products.toString());
	res.end();
}
