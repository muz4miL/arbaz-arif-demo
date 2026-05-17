import fs from "fs";
import path from "path";

const TAG = "motionless";
const REPLACEMENT = "div";

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".tsx")) fix(full);
  }
}

function fix(file) {
  let s = fs.readFileSync(file, "utf8");
  if (!s.includes(TAG)) return;
  s = s.replaceAll(`<${TAG}`, `<${REPLACEMENT}`);
  s = s.replaceAll(`</${TAG}>`, `</${REPLACEMENT}>`);
  fs.writeFileSync(file, s);
  console.log("fixed", file);
}

walk(path.join(process.cwd(), "src"));
