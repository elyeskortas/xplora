import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { pathToFileURL } from "url";

// Script to replace vinyl category values such as "BestSellers" or "NewArrival"
// with more appropriate categories (default mapping below). You can pass a JSON
// object as the first CLI argument to override the mapping, for example:
// node ./scripts/update-categories.js '{"BestSellers":"Rock","NewArrival":"Rock"}'

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in .env");
  process.exit(1);
}

console.log("Connecting to MongoDB...");
await mongoose.connect(MONGODB_URI);

// Load the Vinyl model from the project (dynamic import so this script stays ESM-safe)
const vinylModule = await import(pathToFileURL(path.resolve(process.cwd(), "src/models/vinyl.js")).href);
const Vinyl = vinylModule.default;

// Default mapping: change these to whatever you want
const defaultMapping = {
  BestSellers: "Rock",
  NewArrival: "Jazz",
};

let mapping = { ...defaultMapping };
if (process.argv[2]) {
  try {
    const userMap = JSON.parse(process.argv[2]);
    mapping = { ...mapping, ...userMap };
  } catch (e) {
    console.warn("Invalid mapping argument, using defaults. Provide JSON as first arg to override.");
  }
}

console.log("Category mapping to apply:", mapping);

const summary = [];
for (const [from, to] of Object.entries(mapping)) {
  try {
    const res = await Vinyl.updateMany({ category: from }, { $set: { category: to } });
    const modified = res.modifiedCount ?? res.nModified ?? res.matchedCount ?? 0;
    console.log(`Updated category '${from}' -> '${to}': ${modified} documents modified.`);
    summary.push({ from, to, modified });
  } catch (err) {
    console.error(`Error updating '${from}' -> '${to}':`, err.message || err);
    summary.push({ from, to, error: String(err) });
  }
}

// Optional: also update vinyls that have category exactly "BestSellers" inside tags or similar fields
// (Left intentionally simple — modify if your data stores category elsewhere.)

// Write summary file
import fs from "fs";
const outPath = path.resolve(process.cwd(), "scripts", "update-categories-log.json");
fs.writeFileSync(outPath, JSON.stringify({ date: new Date().toISOString(), summary }, null, 2));
console.log("Wrote log to", outPath);

await mongoose.disconnect();
console.log("Disconnected.");
process.exit(0);
