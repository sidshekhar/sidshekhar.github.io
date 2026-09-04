# Writing

Posts live here as Markdown. `build.js` turns them into `/writing/<slug>/`, the
`/writing/` index, `sitemap.xml` and `rss.xml`. The generated HTML is committed,
so GitHub Pages still serves plain static files — there is no build step on their side.

## Adding a post

1. Create `posts/<slug>.md`. The slug becomes the URL: `/writing/<slug>/`.
2. Front matter:

   ```yaml
   ---
   title: The title as it appears on the page
   subtitle: Optional deck under the title
   description: One or two sentences. This is the meta description and the RSS blurb, so make it count for search.
   date: 2026-09-03          # ISO. Sorts the index and fills <time> + JSON-LD.
   tags: [ai, ethereum]      # Optional, feeds JSON-LD keywords.
   original_url: https://…   # Optional. Adds "Originally published on …" at the foot.
   original_name: Paragraph  # Label for that link.
   draft: true               # Optional. Excluded from the build entirely.
   ---
   ```

3. `node build.js`

## Images

Write image URLs remotely first, then let the tooling localise and shrink them:

```bash
node tools/fetch-images.js    # downloads into images/writing/<slug>/, rewrites the markdown
node tools/optimize-images.js # re-encodes oversized PNGs as JPEG where that is smaller
node tools/gifs-to-mp4.js     # GIF -> looping muted MP4 (roughly a tenth the bytes)
node build.js
```

All three are idempotent and safe to re-run. A `.mp4` source renders as an
autoplaying, muted, looping `<video>` rather than an `<img>`.

## Supported Markdown

`##`–`####` headings (auto-anchored), paragraphs, `-` and `1.` lists, `>` blockquotes,
`[links](url)`, `**bold**`, `*italic*`, `` `code` ``, `---` rules, and
`![alt](src "caption")` images, which become a `<figure>` with a `<figcaption>`.

Links to other sites open in a new tab; links within sidshekhar.com stay in the
same tab.

## Cache busting

`build.js` stamps `?v=` on the CSS and JS using `ASSET_V` (default `w1`). When you
change `css/style.css` or `js/site.js`, bump it in the hand-written pages and pass
the same value here:

```bash
ASSET_V=w3 node build.js
```
