import fs from "fs";

export default function getProducts() {
    let products = [];

    fs.readFile("./inventory/Vilmabas-artiklar.csv", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        for (let row of data.split("\n")) {
            const rowItems = row.split(";");
            products.push(rowItems[3]);
        }
        // res.send(products);
    });
}