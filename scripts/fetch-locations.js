const fs = require("node:fs");
const path = require("node:path");

const BASE_URL = "https://rickandmortyapi.com/api/location";

async function fetchAllPages() {
  let page = 1;
  const all = [];

  while (true) {
    const url = `${BASE_URL}?page=${page}`;
    console.log(`→ Fetching page ${page}`);

    const res = await fetch(url);

    if (res.status === 404) {
      console.log(`✖ Page ${page} returned 404, stopping.`);
      break;
    }

    if (!res.ok) {
      throw new Error(`Failed page ${page}: ${res.status}`);
    }

    const data = await res.json();
    all.push(...data.results);

    page++;
  }

  return all;
}

function uniqueByName(locations) {
  const map = new Map();

  for (const loc of locations) {
    map.set(loc.name, loc);
  }

  return Array.from(map.values());
}


async function main() {
  try {
    const all = await fetchAllPages();

    console.log(`Fetched ${all.length} total locations.`);

    const unique = uniqueByName(all);
    console.log(`Unique locations: ${unique.length}`);

    const uniqueNames = unique.map(location => location.name);
    fs.writeFileSync(path.join(__dirname, "locations-names.json"), JSON.stringify(uniqueNames, null, 2), "utf8");
  } catch (err) {
    console.error(err);
  }
}

main();