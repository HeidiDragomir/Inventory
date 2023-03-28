import fs from "fs";

export default async function handler(req, res) {

	// get data from file
	fs.readFile("./inventory/BK04-categories.csv", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		res.send(data);
		console.log(data);
	});

	// create and update file
	// fs.appendFile(
	// 	"./inventory/text.json",
	// 	"new text",
	// 	(err) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return;
	// 		}
	// 		res.send("file updated");
	// 	}
	// );

	// replace text in file
// fs.writeFile("./inventory/text.json", "some new text", (err) => {
// 	if (err) {
// 		console.error(err);
// 		return;
// 	}
// 	res.send("text replaced");
// });
}
