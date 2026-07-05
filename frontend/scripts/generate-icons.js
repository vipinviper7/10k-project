/**
 * Renders the app icon SVG to the PNG sizes referenced by
 * public/index.html and public/manifest.json.
 *
 * Usage: node scripts/generate-icons.js
 */
const sharp = require('sharp');
const path = require('path');

const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e2602e"/>
      <stop offset="100%" stop-color="#c2481f"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="116" fill="url(#bg)"/>
  <!-- plate -->
  <circle cx="256" cy="264" r="150" fill="none" stroke="#fdf6ee" stroke-width="18" opacity="0.55"/>
  <!-- camera body -->
  <rect x="156" y="196" width="200" height="150" rx="28" fill="#fdf6ee"/>
  <!-- camera top bump -->
  <path d="M214 196 L226 172 a12 12 0 0 1 11 -8 h38 a12 12 0 0 1 11 8 L298 196 Z" fill="#fdf6ee"/>
  <!-- lens -->
  <circle cx="256" cy="271" r="46" fill="#c2481f"/>
  <circle cx="256" cy="271" r="26" fill="#fdf6ee"/>
  <!-- flash dot -->
  <circle cx="330" cy="226" r="10" fill="#c2481f"/>
</svg>
`;

const outDir = path.join(__dirname, '..', 'public');

async function main() {
  const buffer = Buffer.from(svg);
  await sharp(buffer).resize(512, 512).png().toFile(path.join(outDir, 'logo512.png'));
  await sharp(buffer).resize(192, 192).png().toFile(path.join(outDir, 'logo192.png'));
  await sharp(buffer).resize(64, 64).png().toFile(path.join(outDir, 'favicon.png'));
  console.log('Icons written to public/: logo512.png, logo192.png, favicon.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
