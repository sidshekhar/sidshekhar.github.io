#!/usr/bin/env node
// GIFs are the heaviest thing on these pages. Convert each to a looping,
// muted MP4 (roughly a tenth the bytes) and point the markdown at it;
// build.js renders a .mp4 source as an autoplaying <video> instead of an <img>.
// Requires ffmpeg. Run after tools/fetch-images.js, then re-run `node build.js`.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'images', 'writing');
const renames = [];
let saved = 0;

for (const slug of fs.readdirSync(IMG)) {
  const dir = path.join(IMG, slug);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.gif'))) {
    const src = path.join(dir, file);
    const mp4Name = file.replace(/\.gif$/, '.mp4');
    const dst = path.join(dir, mp4Name);
    const gifSize = fs.statSync(src).size;

    try {
      execFileSync(
        'ffmpeg',
        [
          '-y', '-i', src,
          // yuv420p + even dimensions are what Safari and Chrome actually decode.
          '-vf', "scale='min(1200,iw)':-2:flags=lanczos,format=yuv420p",
          '-movflags', '+faststart',
          '-pix_fmt', 'yuv420p',
          '-crf', '26',
          '-an',
          dst,
        ],
        { stdio: 'ignore' }
      );
    } catch (err) {
      console.log(`  ! ${slug}/${file} — ffmpeg failed, keeping the gif`);
      continue;
    }

    const mp4Size = fs.statSync(dst).size;
    if (mp4Size >= gifSize) {
      fs.unlinkSync(dst);
      continue;
    }
    fs.unlinkSync(src);
    renames.push([`/images/writing/${slug}/${file}`, `/images/writing/${slug}/${mp4Name}`]);
    saved += gifSize - mp4Size;
    console.log(
      `  ${slug}/${file}  ${(gifSize / 1024 / 1024).toFixed(1)}MB -> ${(mp4Size / 1024).toFixed(0)}KB mp4`
    );
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
}

console.log(`\n${renames.length} converted, ${(saved / 1024 / 1024).toFixed(1)}MB saved.`);
