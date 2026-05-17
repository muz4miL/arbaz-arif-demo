import fs from "fs";

const html = fs.readFileSync("index.html", "utf8");
let css = html.match(/<style>([\s\S]*?)<\/style>/)[1];

css = css
  .replace(/'Inter'/g, "var(--font-inter), sans-serif")
  .replace(/'Bebas Neue'/g, "var(--font-bebas), sans-serif")
  .replace(/'Space Grotesk'/g, "var(--font-space), sans-serif")
  .replace(/'JetBrains Mono'/g, "var(--font-mono), monospace");

css += `
.hero-img .hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0;
  transition: opacity 1.2s ease;
}
.hero-img .hero-image.loaded {
  opacity: 1;
}
.about-photo.about-photo-visible {
  display: block;
}
`;

fs.mkdirSync("src/app", { recursive: true });
fs.writeFileSync("src/app/globals.css", css);
