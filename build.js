#!/usr/bin/env node
/* ==========================================================================
   sidshekhar.com — static site generator for /writing/.
   Reads posts/*.md, writes writing/<slug>/index.html, writing/index.html,
   sitemap.xml and rss.xml. Output is committed, so GitHub Pages still serves
   pure static files with no build step of its own.

   Usage: node build.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = 'https://www.sidshekhar.com';
const AUTHOR = 'Sid Shekhar';
const ASSET_V = process.env.ASSET_V || 'w1';

/* ---------- front matter ---------- */

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) {
      v = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    data[kv[1]] = v;
  }
  return { data, body: raw.slice(m[0].length) };
}

/* ---------- markdown ---------- */

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline spans. Code is pulled out first (its contents are literal), then the
// escaped remainder gets links, bold and em applied, then code is spliced back.
const CODE_OPEN = 'CODE';
const CODE_CLOSE = '';

function inline(src) {
  const codes = [];
  let s = src.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return CODE_OPEN + (codes.length - 1) + CODE_CLOSE;
  });

  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => {
    const ext = /^https?:\/\//.test(href) && !href.startsWith(SITE);
    return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(new RegExp(CODE_OPEN + '(\\d+)' + CODE_CLOSE, 'g'), (_, i) => `<code>${esc(codes[+i])}</code>`);
  return s;
}

const slugifyHeading = (t) =>
  t
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

function markdown(body) {
  const blocks = body.trim().split(/\r?\n\r?\n+/);
  const html = [];

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    // An image alone on a line becomes a figure. Sources converted from GIF by
    // tools/gifs-to-mp4.js render as a silent looping video instead.
    const img = block.match(/^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/);
    if (img) {
      const [, alt, src, caption] = img;
      const media = src.endsWith('.mp4')
        ? `<video src="${src}" autoplay loop muted playsinline preload="metadata" aria-label="${esc(alt)}"></video>`
        : `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
      html.push(
        `<figure class="post__figure">` +
          media +
          (caption ? `<figcaption>${inline(caption)}</figcaption>` : '') +
          `</figure>`
      );
      continue;
    }

    const heading = block.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level} id="${slugifyHeading(heading[2])}">${inline(heading[2])}</h${level}>`);
      continue;
    }

    if (block.startsWith('> ')) {
      const text = block
        .split(/\r?\n/)
        .map((l) => l.replace(/^>\s?/, ''))
        .join(' ');
      html.push(`<blockquote><p>${inline(text)}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s/.test(block)) {
      const items = block
        .split(/\r?\n(?=[-*]\s)/)
        .map((li) => `<li>${inline(li.replace(/^[-*]\s+/, '').replace(/\s*\n\s*/g, ' '))}</li>`);
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(block)) {
      const items = block
        .split(/\r?\n(?=\d+\.\s)/)
        .map((li) => `<li>${inline(li.replace(/^\d+\.\s+/, '').replace(/\s*\n\s*/g, ' '))}</li>`);
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // GFM-style pipe table: header row, a `---` separator row, then body rows.
    // Wrapped in a scroller so a wide table never makes the page scroll sideways.
    if (/^\|.*\|$/m.test(block) && /^\|[\s:|-]+\|$/m.test(block)) {
      const rows = block
        .split(/\r?\n/)
        .filter((l) => l.trim().startsWith('|'))
        .map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      const [header, , ...body] = rows;
      html.push(
        `<div class="post__table">
        <table>
          <thead><tr>${header.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>
          <tbody>${body
            .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
            .join('')}</tbody>
        </table>
      </div>`
      );
      continue;
    }

    if (block === '---') {
      html.push('<hr>');
      continue;
    }

    html.push(`<p>${inline(block.replace(/\s*\n\s*/g, ' '))}</p>`);
  }

  return html.join('\n      ');
}

/* ---------- shared chrome (kept in sync with the hand-written pages) ---------- */

const head = ({ title, description, canonical, image, jsonld, ogType }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f8f4f1">
  <script>
    (function(){var d=document.documentElement;d.classList.add('js');var t;
    try{t=localStorage.getItem('theme')}catch(e){}
    if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
    d.dataset.theme=t;})();
  </script>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="${AUTHOR}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="${AUTHOR}">${
  image ? `\n  <meta property="og:image" content="${SITE}${image}">` : ''
}
  <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
  <meta name="twitter:creator" content="@sidshekhar24">
  <link rel="alternate" type="application/rss+xml" title="Sid Shekhar — Writing" href="${SITE}/rss.xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="/css/style.css?v=${ASSET_V}">
  <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
  <link rel="manifest" href="/images/site.webmanifest">
  <script src="/js/site.js?v=${ASSET_V}" defer></script>
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
  <!-- header:start -->
  <header class="site-header container">
    <a class="wordmark label" href="/">Sid Shekhar</a>
    <button class="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false">
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
    </button>
  </header>
  <!-- header:end -->
`;

const foot = `
  <!-- footer:start -->
  <footer class="site-footer container">
    <span>© ${new Date().getFullYear()} ${AUTHOR}</span>
    <nav aria-label="Footer">
      <a href="/">Home</a>
      <a href="/writing/">Writing</a>
      <a href="/gina/">Gina</a>
      <a href="/coinbase/">Coinbase</a>
      <a href="/tokenanalyst/">TokenAnalyst</a>
      <a href="/rss.xml">RSS</a>
    </nav>
  </footer>
  <!-- footer:end -->
</body>
</html>
`;

/* ---------- helpers ---------- */

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const fmtDate = (iso) => {
  const d = new Date(iso + 'T12:00:00Z');
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};
const readingTime = (body) => Math.max(1, Math.round(body.split(/\s+/).length / 225));

/* ---------- collect ---------- */

const posts = fs
  .readdirSync(path.join(ROOT, 'posts'))
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .map((file) => {
    const raw = fs.readFileSync(path.join(ROOT, 'posts', file), 'utf8');
    const { data, body } = parseFrontMatter(raw);
    const slug = file.replace(/\.md$/, '');
    const firstImg = body.match(/!\[[^\]]*\]\((\/images\/[^\s)]+\.(?:png|jpe?g|gif|webp))/);
    return {
      ...data,
      slug,
      body,
      url: `/writing/${slug}/`,
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: firstImg ? firstImg[1] : null,
      minutes: readingTime(body),
    };
  })
  .filter((p) => p.draft !== 'true')
  .sort((a, b) => (a.date < b.date ? 1 : -1));

for (const p of posts) {
  for (const field of ['title', 'description', 'date']) {
    if (!p[field]) {
      console.error(`posts/${p.slug}.md is missing required front matter: ${field}`);
      process.exit(1);
    }
  }
}

if (!posts.length) {
  console.error('No posts found in posts/.');
  process.exit(1);
}

/* ---------- post pages ---------- */

for (const post of posts) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: AUTHOR, url: SITE + '/' },
    publisher: { '@type': 'Person', name: AUTHOR, url: SITE + '/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + post.url },
    url: SITE + post.url,
    keywords: post.tags.join(', '),
    wordCount: post.body.split(/\s+/).length,
    ...(post.image ? { image: SITE + post.image } : {}),
  };

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const page =
    head({
      title: `${post.title} — ${AUTHOR}`,
      description: post.description,
      canonical: SITE + post.url,
      image: post.image,
      ogType: 'article',
      jsonld,
    }) +
    `
  <main class="container">
    <article class="post">
      <header class="post__head reveal">
        <a class="post__back label" href="/writing/">← Writing</a>
        <h1>${esc(post.title)}</h1>
        ${post.subtitle ? `<p class="post__sub">${esc(post.subtitle)}</p>` : ''}
        <p class="post__meta label">
          <time datetime="${post.date}">${fmtDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>${post.minutes} min read</span>
        </p>
      </header>

      <!-- No .reveal here: the article body is the content, it should never be
           gated behind JS or a scroll animation. -->
      <div class="post__body">
      ${markdown(post.body)}
      </div>
${
  post.original_url
    ? `
      <p class="post__origin muted">Originally published on <a href="${post.original_url}" target="_blank" rel="noopener">${esc(
        post.original_name || 'the original site'
      )}</a>.</p>`
    : ''
}
    </article>

    <section class="post__more reveal" aria-label="More writing">
      <span class="label">More writing</span>
      <ul class="post__more-list">
        ${related
          .map(
            (p) => `<li>
          <a href="${p.url}">
            <span class="post__more-title">${esc(p.title)}</span>
            <time class="label" datetime="${p.date}">${fmtDate(p.date)}</time>
          </a>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </section>
  </main>
` +
    foot;

  const dir = path.join(ROOT, 'writing', post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page);
}

/* ---------- writing index ---------- */

const indexJsonld = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: `${AUTHOR} — Writing`,
  url: SITE + '/writing/',
  author: { '@type': 'Person', name: AUTHOR, url: SITE + '/' },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: SITE + p.url,
    datePublished: p.date,
  })),
};

const byYear = posts.reduce((acc, p) => {
  const y = p.date.slice(0, 4);
  (acc[y] = acc[y] || []).push(p);
  return acc;
}, {});

const indexPage =
  head({
    title: `Writing — ${AUTHOR}`,
    description:
      'Essays and on-chain data analysis by Sid Shekhar — on agentic AI, Ethereum, DeFi and crypto social networks.',
    canonical: SITE + '/writing/',
    image: posts[0].image,
    ogType: 'website',
    jsonld: indexJsonld,
  }) +
  `
  <main class="container">
    <section class="intro reveal">
      <h1>Writing</h1>
      <p>
        Essays and on-chain data analysis going back to 2018 — mostly about what the data
        says once you look past the price chart, and lately about what happens when you give
        an AI agent a wallet.
      </p>
      <p class="muted"><a href="/rss.xml">Subscribe via RSS</a></p>
    </section>

    <section class="writing-list" aria-label="All posts">
      ${Object.keys(byYear)
        .sort((a, b) => Number(b) - Number(a))
        .map(
          (year) => `<div class="writing-year reveal">
        <h2 class="label">${year}</h2>
        <ul>
          ${byYear[year]
            .map(
              (p) => `<li class="reveal">
            <a class="entry" href="${p.url}">
              ${
                p.image
                  ? `<img class="entry__thumb" src="${p.image}" alt="" loading="lazy" decoding="async">`
                  : '<span class="entry__thumb entry__thumb--empty" aria-hidden="true"></span>'
              }
              <span class="entry__body">
                <span class="entry__title">${esc(p.title)}</span>
                <span class="entry__desc muted">${esc(p.description)}</span>
                <span class="entry__meta label">
                  <time datetime="${p.date}">${fmtDate(p.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>${p.minutes} min</span>
                </span>
              </span>
            </a>
          </li>`
            )
            .join('\n          ')}
        </ul>
      </div>`
        )
        .join('\n      ')}
    </section>
  </main>
` +
  foot;

fs.mkdirSync(path.join(ROOT, 'writing'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'writing', 'index.html'), indexPage);

/* ---------- sitemap ---------- */

const staticPages = ['/', '/writing/', '/gina/', '/coinbase/', '/tokenanalyst/'];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (u) =>
      `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${
        u === '/' ? '1.0' : '0.8'
      }</priority></url>`
  )
  .join('\n')}
${posts
  .map(
    (p) =>
      `  <url><loc>${SITE}${p.url}</loc><lastmod>${p.date}</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

/* ---------- rss ---------- */

const rssDate = (iso) => new Date(iso + 'T12:00:00Z').toUTCString();
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sid Shekhar — Writing</title>
    <link>${SITE}/writing/</link>
    <description>Essays and on-chain data analysis by Sid Shekhar.</description>
    <language>en</language>
    <lastBuildDate>${rssDate(posts[0].date)}</lastBuildDate>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}${p.url}</link>
      <guid isPermaLink="true">${SITE}${p.url}</guid>
      <pubDate>${rssDate(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, 'rss.xml'), rss);

console.log(`Built ${posts.length} posts to /writing/, plus the index, sitemap.xml and rss.xml.`);
