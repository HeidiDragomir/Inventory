import fs from "fs";

export default async function getCategories(req, res) {

    let categories = [];
    let products = [];

    fs.readFile("./inventory/BK04-categories.csv", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of data.split("\n")) {
            const rowItems = row.split(" ");
            categories.push(rowItems[0].toString());
        }
        res.status(200).write(categories);
        console.log("categories", categories);
    });
    

    fs.readFile("./inventory/Vilmabas-artiklar.csv", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of data.split("\n")) {
            const rowItems = row.split(" ");
            products.push(rowItems[0].toString());
        }
        res.status(200).write(products);
    });
    console.log("products", products);





}