# Nightwalker Hub

Static website for GitHub Pages.

## Deploy on GitHub Pages

1. Upload all files in this folder to the root of a GitHub repository.
2. Keep `index.html` in the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the branch (usually `main`) and folder `/ (root)`.
5. Open the generated GitHub Pages URL.

## Runtime notes

- The site is fully static and needs no build step.
- Kick live status uses a public CORS proxy to reach Kick's endpoint from the browser.
- Latest YouTube video uses `rss2json` as a browser-readable RSS bridge.
- Browser notifications work while the page is open and the visitor has granted notification permission. A true background push system would require a push service/backend.
# Nightwalker-
# Nightwalker-
