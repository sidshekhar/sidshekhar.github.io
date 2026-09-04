#!/usr/bin/env node
// Re-encodes any oversized PNG in images/writing/<slug>/ as JPEG and keeps
// whichever encoding is smaller, rewriting posts/*.md to match.
// Charts with flat colour keep their PNG; screenshots and photos become JPEG.
// Run after tools/fetch-images.js, then re-run `node build.js`.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'images', 'writing');
const THRESHOLD = 250 * 1024; // only bother with files above this
const QUALITY = 82;

let saved = 0;
const renames = [];

for (const slug of fs.readdirSync(IMG)) {
  const dir = path.join(IMG, slug);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.png')) continue;
    const src = path.join(dir, file);
    const pngSize = fs.statSync(src).size;
    if (pngSize < THRESHOLD) continue;

    const jpgName = file.replace(/\.png$/, '.jpg');
    const dst = path.join(dir, jpgName);
    try {
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(QUALITY), src, '--out', dst], {
        stdio: 'ignore',
      });
    } catch {
      continue;
    }

    const jpgSize = fs.statSync(dst).size;
    if (jpgSize < pngSize * 0.9) {
      fs.unlinkSync(src);
      renames.push([`/images/writing/${slug}/${file}`, `/images/writing/${slug}/${jpgName}`]);
      saved += pngSize - jpgSize;
      console.log(
        `  ${slug}/${file}  ${(pngSize / 1024).toFixed(0)}KB -> ${(jpgSize / 1024).toFixed(0)}KB jpeg`
      );
    } else {
      fs.unlinkSync(dst);
    }
  }
}

if (renames.length) {
  const postsDir = path.join(ROOT, 'posts');
  for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
    const p = path.join(postsDir, file);
    let md = fs.readFileSync(p, 'utf8');
    for (const [from, to] of renames) md = md.split(from).join(to);
    fs.writeFileSync(p, md);
  }
  // The hand-written pages reference a couple of these as card thumbnails.
  for (const page of ['index.html', 'gina/index.html', 'coinbase/index.html', 'tokenanalyst/index.html']) {
    const p = path.join(ROOT, page);
    let html = fs.readFileSync(p, 'utf8');
    for (const [from, to] of renames) html = html.split(from).join(to);
    fs.writeFileSync(p, html);
  }
}

console.log(`\n${renames.length} converted, ${(saved / 1024 / 1024).toFixed(1)}MB saved.`);
