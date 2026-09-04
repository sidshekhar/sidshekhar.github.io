#!/usr/bin/env node
// Downloads every remote image referenced in posts/*.md into
// images/writing/<slug>/ and rewrites the markdown to point at the local copy.
// Idempotent: already-local paths are skipped, already-downloaded files are reused.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS = path.join(ROOT, 'posts');
const OUT = path.join(ROOT, 'images', 'writing');

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const EXT = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
};

const slugOf = (f) => f.replace(/\.md$/, '');

function nameFor(url, i) {
  const base = decodeURIComponent(url.split('?')[0].split('/').pop() || 'img')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32) || 'img';
  return String(i + 1).padStart(2, '0') + '-' + base.toLowerCase();
}

async function main() {
  const files = fs.readdirSync(POSTS).filter((f) => f.endsWith('.md'));
  let downloaded = 0;
  let reused = 0;
  const failures = [];

  for (const file of files) {
    const slug = slugOf(file);
    const mdPath = path.join(POSTS, file);
    let md = fs.readFileSync(mdPath, 'utf8');

    const urls = [...md.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)/g)].map((m) => m[1]);
    const unique = [...new Set(urls)];
    if (!unique.length) continue;

    const dir = path.join(OUT, slug);
    fs.mkdirSync(dir, { recursive: true });

    for (let i = 0; i < unique.length; i++) {
      const url = unique[i];
      const stem = nameFor(url, i);
      const existing = fs.readdirSync(dir).find((f) => f.startsWith(stem + '.'));

      if (existing) {
        reused++;
        md = md.split(url).join(`/images/writing/${slug}/${existing}`);
        continue;
      }

      try {
        const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'image/*,*/*' } });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const type = (res.headers.get('content-type') || '').split(';')[0].trim();
        const ext = EXT[type] || path.extname(url.split('?')[0]) || '.png';
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 500) throw new Error('suspiciously small (' + buf.length + ' bytes)');
        fs.writeFileSync(path.join(dir, stem + ext), buf);
        downloaded++;
        console.log(`  ↓ ${slug}/${stem}${ext}  ${(buf.length / 1024).toFixed(0)}KB`);
        md = md.split(url).join(`/images/writing/${slug}/${stem}${ext}`);
      } catch (err) {
        failures.push(`${slug}: ${url} — ${err.message}`);
      }
    }

    fs.writeFileSync(mdPath, md);
  }

  console.log(`\n${downloaded} downloaded, ${reused} already present.`);
  if (failures.length) {
    console.log(`\n${failures.length} failed (markdown left pointing at the remote URL):`);
    failures.forEach((f) => console.log('  ! ' + f));
    process.exitCode = 1;
  }
}

main();
