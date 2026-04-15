// Run: node scripts/generate-icons.js
// Generates PWA icons as simple SVG-based PNGs

const fs = require("fs");
const { createCanvas } = (() => {
  try { return require("canvas"); } catch { return { createCanvas: null }; }
})();

function generateSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#60a5fa"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Georgia, serif" font-size="${size * 0.45}" font-weight="bold">S</text>
</svg>`;
}

// Write SVG icons as a fallback (browsers can use SVG in manifests too)
fs.writeFileSync("public/icon-192.svg", generateSVGIcon(192));
fs.writeFileSync("public/icon-512.svg", generateSVGIcon(512));

console.log("SVG icons generated in public/");
console.log("Note: For production PNG icons, use an image editor or online converter.");
