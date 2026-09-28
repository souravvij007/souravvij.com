# Sourav Vij — Portfolio

Static site, no build step: `index.html`, `styles.css`, `script.js`, `assets/`.

## Preview locally
```
python -m http.server 5173
```
Then open http://localhost:5173

## Edit content
- **Work cards**: in `index.html` under `<!-- ============ WORK ============ -->`. Each `<article class="card">` has a `data-cat` (`creative`, `technical`, `web` — space-separated) that drives the filter buttons.
- **Real images**: replace a card's `<div class="card__cover ...">…</div>` contents with `<img src="assets/your-image.jpg" alt="…" style="width:100%;height:100%;object-fit:cover">`.
- **Résumé**: replace `assets/Sourav-Vij-Resume.pdf`.

## Deploy
Any static host works. With Vercel: `npm i -g vercel` then `vercel --prod` from this folder.
