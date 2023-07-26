const fs = require("fs");
const path = require("path");

const filePath1 = path.join(__dirname, "oracle-cards.json");
const targetArray = [];

fs.readFile(filePath1, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const arrayOfObjects = JSON.parse(data);

  arrayOfObjects.forEach((obj) => {
    targetArray.push(
      {
        name: obj.name,
        image_uris: obj.image_uris
      });
  });

  console.log(targetArray);

  const jsonData = JSON.stringify(targetArray);
  const filepath2 = path.join(__dirname, "imgArray.json");

  fs.writeFile(filepath2, jsonData, "utf-8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("New file created successfully");
  });
});
