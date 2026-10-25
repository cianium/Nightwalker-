# Nightwalker Hub

**Status: published static-site prototype · integration reliability not independently verified**

[Live demo](https://cianium.github.io/Nightwalker-/) · [Source](https://github.com/cianium/Nightwalker-)

A responsive, streaming-oriented personal hub with sections for creator details, support, YouTube updates and Kick live status. Built in HTML, CSS and vanilla JavaScript; no server-side application is included.

## Features

- Responsive homepage, about and support pages
- Live status integration for Kick through a browser-accessible CORS proxy
- Latest YouTube update through an RSS-to-JSON bridge
- Optional browser notifications **while the page is open and permission is granted**

External providers and publicly available proxies can change or fail. This repository does **not** implement reliable background push notifications, a private API or a guaranteed realtime event pipeline.

## Structure

```text
index.html      Home
about.html      About
support.html    Support
main.js         Browser interactions/integrations
style.css       Responsive styling
assets/         Local media
```

## Run locally

```bash
python3 -m http.server 8080
```

Visit `http://localhost:8080`.

## Deploy

GitHub Pages can serve the root of branch `main`. See the repository **Settings → Pages** to confirm the publication source. For any custom domain, verify HTTPS and the exact deployed revision.

## Before calling it production-ready

- Test CORS, API response validation and fallback when Kick/YouTube bridge endpoints fail.
- Review third-party proxy privacy and rate limits.
- Run mobile keyboard/accessibility and browser checks.
- Add automated tests and an explicit deployment workflow.
- Document all external assets and their licenses.

## License

No project-wide license is currently declared; check permission before reuse.
