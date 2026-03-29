#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";




const srcFile = "./scripts/data/logo.png";
const destDir = "./public";



//fs.rmSync(destDir, { recursive: true, });
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true, });
}


main();


async function main() {
  const files = [
    { name: "apple-icon.png", size: 192, },
    { name: "apple-icon-precomposed.png", size: 192, },
    { name: "apple-icon-180x180.png", size: 180, },
    { name: "apple-icon-152x152.png", size: 152, },
    { name: "apple-icon-144x144.png", size: 144, },
    { name: "apple-icon-120x120.png", size: 120, },
    { name: "apple-icon-114x114.png", size: 114, },
    { name: "apple-icon-76x76.png", size: 76, },
    { name: "apple-icon-72x72.png", size: 72, },
    { name: "apple-icon-60x60.png", size: 60, },
    { name: "apple-icon-57x57.png", size: 57, },

    { name: "android-icon-512x512.png", size: 512, },
    { name: "android-icon-192x192.png", size: 192, },
    { name: "android-icon-144x144.png", size: 144, },
    { name: "android-icon-96x96.png", size: 96, },
    { name: "android-icon-72x72.png", size: 72, },
    { name: "android-icon-48x48.png", size: 48, },
    { name: "android-icon-36x36.png", size: 36, },

    { name: "ms-icon-310x310.png", size: 310, },
    { name: "ms-icon-150x150.png", size: 150, },
    { name: "ms-icon-144x144.png", size: 144, },
    { name: "ms-icon-70x70.png", size: 70, },

    //{ name: "favicon.ico", size: "?", },
    { name: "favicon-96x96.png", size: 96, },
    { name: "favicon-32x32.png", size: 32, },
    { name: "favicon-16x16.png", size: 16, },
  ];

  for (let i in files) {
    await makeLogo(srcFile, files[i].name, files[i].size);
  }
}



async function makeLogo(srcFile, fileName, size) {
  const fileBuffImage = await sharp(srcFile)
    .resize(size, size)
    .withMetadata({
      compressionLevel: 9,
      quality: 72,
      density: 72,
      force: true,
    })
    .png({
      compressionLevel: 9,
      quality: 72,
      density: 72,
      force: true,
    })
    .toColourspace("srgb")
    .toBuffer();

  const file = path.join(
    destDir,
    fileName
  );
  fs.writeFileSync(file, fileBuffImage);
  return true;
}
