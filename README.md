<div align="center">

# Nightwalker Hub

**A Persian-first gaming, streaming and creator landing page.**

**HTML · CSS · Vanilla JavaScript · GitHub Pages**

[![Status](https://img.shields.io/badge/Status-Static%20Prototype-64748B)](https://github.com/cianium/Nightwalker-)
[![Deployments](https://img.shields.io/badge/GitHub%20Pages-Deployment%20History-2563EB)](https://github.com/cianium/Nightwalker-/actions)

[Website](https://cianium.github.io/Nightwalker-/) · [Source Code](https://github.com/cianium/Nightwalker-)

</div>

> **Status:** Deployed as a static GitHub Pages project; the latest recorded Pages deployment succeeded. The third-party live-status/video APIs, notification permissions and browser behavior have **not been independently verified end-to-end**. This is not a hosted streaming platform or a background push-notification service.

## Overview

Nightwalker Hub brings a creator's streaming presence into one responsive, right-to-left website. Visitors can see creator information, open social/streaming profiles, view a Kick live-status indicator, follow a link to the latest YouTube video and visit About and Support pages.

The project uses **plain HTML, CSS and JavaScript**. There is no package manager, build pipeline, server, database or sign-in system in the repository.

## Features

| Feature | Implementation | Limitations |
| :-- | :-- | :-- |
| **Creator landing page** | Responsive Persian/RTL profile, links and social navigation | Static content must be maintained manually |
| **Kick live indicator** | Checks a Kick channel API through a public CORS proxy every 60 seconds while the page is open | Proxy/API rate limits or failures can leave the last known state on screen |
| **YouTube latest video** | Loads the newest item through an RSS-to-JSON service | Requires an external service; falls back to a direct channel link on failure |
| **Optional browser notification** | Requests notification permission and notifies when an offline-to-live transition is detected | Works only while the page is open, supported and authorized; **no service worker, Web Push or background alerts** |
| **About & Support** | Separate static pages with navigation | No payment/creator-support backend is provided by this repo |

**Provider dependencies:** [Kick](https://kick.com/nightwalkerad), [YouTube](https://www.youtube.com/@nightwalker_farsi), `corsproxy.io` and `api.rss2json.com`. Their uptime, privacy practices, API contracts and quotas are outside the repository owner's control.

## Project structure

```text
Nightwalker-/
├── index.html          Creator homepage / live status / latest video
├── about.html          Creator introduction page
├── support.html        Support page
├── main.js             Kick and YouTube fetching; notification UI
├── style.css           Responsive dark-theme / RTL styles
├── assets/
│   └── images/
│       └── profile.jpg Creator profile image
├── .nojekyll           GitHub Pages static publishing
└── README.md           Project documentation
```

## Run locally

A browser and a basic static HTTP server are sufficient; no `npm install` step is needed.

```bash
git clone https://github.com/cianium/Nightwalker-.git
cd Nightwalker-
python3 -m http.server 8080
```

Open **http://localhost:8080**. Live data and notifications may behave differently on localhost versus the published HTTPS origin because they depend on browser permissions and external APIs.

## Publishing

The published website is configured at **https://cianium.github.io/Nightwalker-/**. GitHub's Pages build/deployment workflow has reported successful runs. This indicates successful publication, **not** that the Kick proxy or YouTube feed is currently available.

Use **Settings → Pages** and the [Actions history](https://github.com/cianium/Nightwalker-/actions) to inspect publishing configuration and deployment results.

## Privacy, reliability and accessibility

- Browser settings and notification permission are used only for page-local notification behavior; `localStorage` records whether the notification prompt has been answered.
- External services receive browser requests when dynamic integrations run. Review third-party privacy and data-handling requirements before advertising the page broadly.
- The implementation does **not** deliver notifications while the website is closed.
- Before production promotion, verify failed/offline API states, keyboard navigation, responsive breakpoints, screen-reader behavior and reduced-motion preferences.
- The webpage includes an **“Official Razer Content Creator”** affiliation statement. Verify that any endorsement, brand relationship and logo usage are accurate and authorized before publication.

## Releases and next steps

**No GitHub Releases or version tags are currently published.** GitHub Pages deployments are not equivalent to tagged software releases.

For a future `v1.0.0`:

1. Test the external integrations in real mobile and desktop browsers.
2. Replace brittle public proxies with a documented, reliable approach if the site is intended for ongoing production use.
3. Add HTML/CSS/JavaScript checks and basic browser tests.
4. Verify branding, imagery and affiliation claims, and document any third-party licenses.
5. Tag a tested commit and document what is included; publish the release without overstating notification or livestream reliability.

## License

No repository-wide open-source license has been declared. Public visibility does not automatically permit copying, redistribution or commercial use. Confirm permission for third-party images, icons, logos and branding separately.

---

<div align="center">

**Nightwalker Hub — one place for streams, videos and creator updates.**

</div>
