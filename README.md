# Atlas

`Atlas` is a static web app for browsing traditional food nature, pairing guidance, food-therapy recipes, and food-origin notes.

## Included

- `index.html` — app shell
- `styles.css` — UI styling and interaction polish
- `app.js` — application logic, search, filters, and detail sheets
- `foods-expanded.js` — ingredient library and expanded lookup data
- `PRODUCT.md` — product and design notes

## Run locally

Because this is a static app, you can open `index.html` directly in a browser.

You can also serve it from any static file server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploy as a web app

This repository is ready for static hosting on platforms such as:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel (static output)

No build step is required.

## Notes

- The current app is optimized as a mobile-first web experience.
- Data includes ingredient search, food pairing checks, and structured food-therapy filtering.
