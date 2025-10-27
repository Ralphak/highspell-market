// Tool for fetching and formatting the item list from Highspell's filesystem.
// Run directly from terminal using node command.

const fs = require("fs/promises");
const path = require('path');

const url = "https://highspell.com:8887/static/itemdefs.31.carbon";
const dbPath = "../src/database/";

async function main() {
  const response = await fetch(url);
  const data = await response.json();
  await fs.writeFile(
    path.resolve(__dirname, dbPath.concat("items.json")),
    JSON.stringify(data
      .filter(item => item.isTradeable && item._id != 6) // Filter untradeable items (and coins, of course!)
      .map(mapItemData) // Map each data to the application's model
    )
  );
}

function mapItemData(item) {
  let type = undefined;
  if (item.inventoryActions) {
    if (item.inventoryActions.includes("equip"))
      type = item.equipmentType;
    else if (item.inventoryActions.includes("eat"))
      type = "food";
    else if (item.inventoryActions.includes("drink"))
      type = "drink";
  }
  return {
    id: item._id,
    name: item.name,
    inspect: item.description,
    generalbuy: item.cost,
    generalsell: Math.floor(item.cost * 0.75),
    aurumminor: Math.floor(item.cost * 2 / 3),
    aurummajor: item.cost,
    type
  };
}

main().catch(console.error);