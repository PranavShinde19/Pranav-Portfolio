# Pranav Shinde — Portfolio

A responsive, cinematic portfolio built with React, Vite, Tailwind CSS v4, GSAP + ScrollTrigger, and Lucide. Original React/CSS/SVG interface studies represent ScamShield AI, CivicVision, and StepWise. All fonts are bundled locally; the site needs no runtime API keys or external image services.

## Run locally

Use Node.js 22.12+ or Node.js 24 LTS (validated with Node.js 24). First clone or download the GitHub branch containing the website, then open a terminal in its parent folder.

```sh
cd Pranav-Portfolio
npm ci
npm run dev -- --open
```

Keep the terminal running and open the address printed by Vite (normally port 5173). A `localhost` address works on the computer running Vite; it does not connect your own computer to a server in a cloud workspace. In a cloud workspace, use its supported forwarded-port/browser preview. Each cloud task is already isolated: use the existing checkout; a Git worktree is unnecessary.

For a production build and local production preview:

```sh
npm run build
npm run preview
```

## Personalize

- `src/content.js`: email, GitHub, LinkedIn, résumé URL, project descriptions, focus areas, and suggested technologies. Blank contact fields show labeled placeholders. Blank project URLs do not render links.
- `src/App.jsx`: biography, education, and the achievements placeholder. Add awards/certifications only after verification.
- `src/styles.css`: design tokens, responsive layouts, and interaction styling.
- `src/premium.css`: responsive type/spacing refinements, separated hero card layers, and accessible hover/focus treatments.
- `src/hooks/usePortfolioMotion.js`: GSAP entrance, section/text reveals, project parallax, and desktop-only ambient/pointer motion. Match-media contexts revert animations, observers, and event listeners when motion preferences change or the component unmounts.
- `src/components/Navigation.jsx` and `.css`: sticky navigation, active-section state, and accessible mobile navigation.
- `src/components/ScrollProgress.jsx`: a minimal native-scroll progress indicator that also updates after content resizes.
- `src/components/ProjectVisual.jsx` and `.css`: original decorative interface mockups. These are explicitly labeled concept interfaces, not screenshots of deployed products. Suggested technologies are not claims about existing project implementations.
- `index.html`: document title and social/search metadata.

To add a résumé, place the verified PDF in `public/` and set `profile.resume` to its root-relative path (for example, `/pranav-shinde-resume.pdf`). Keep credentials, private documents, and `.env` files out of Git.

The email is configured as `shindepranav5518@gmail.com`. LinkedIn, résumé, verified achievements, and live project URLs remain unsupplied. No awards, metrics, or work experience are fabricated. The reference video was unavailable; the design follows the written brief rather than a verified video match.

## Interaction and accessibility

- Native anchor scrolling with a progress indicator, staggered GSAP entrances, text reveals, and subtle project parallax; no scroll hijacking.
- Desktop cards gently float, respond subtly to pointer movement, and straighten on hover or keyboard focus. Motion pauses when the hero is offscreen or the page is hidden. Pointer effects are limited to fine-pointer desktop devices.
- Smaller screens reserve a separate stage below the name for the project cards, keeping the heading and navigation clear.
- Sticky navigation highlights the current section. The mobile menu supports Escape with focus restoration, outside-click dismissal, and resize cleanup. Main action targets are at least 44px tall.
- Skill filtering and expandable skill notes are preserved.
- Project dialogs support Escape, focus trapping, focus restoration, and background scroll locking.
- Functional email and copy-email actions, and the supplied repository owner's GitHub profile.
- Reduced-motion preferences disable the moving ticker and GSAP sequences. A ticker pause control is also available.
- Keyboard focus indicators, a skip link, semantic sections, and decorative previews hidden from screen readers.

For a browser regression check, test 360px, 390px, 768px, and 1440px widths. Exercise anchor links, hero/project dialogs, focus restoration, skill filters, and the contact actions. Check that the page has no horizontal overflow. With reduced motion enabled, content must remain visible and ambient/pointer/scroll animations must stop. Also switch the preference while the page is open to confirm that it updates without reloading.

## Save to GitHub

Review the changes first, then run these commands from the repository:

```sh
git status
git add .gitignore README.md index.html package.json package-lock.json vite.config.js vercel.json public src
git commit -m "Build cinematic interactive portfolio"
git push -u origin HEAD
```

These commands save source changes to your current branch. Use a separate feature branch for changes you want reviewed before merging into `main`. Pushing a feature branch does not merge it into `main` or deploy the site by itself.

## Deploy with Vercel

1. Save the changes to GitHub.
2. In Vercel, import `PranavShinde19/Pranav-Portfolio`.
3. Keep the repository root as the root directory and select the **Vite** preset. `vercel.json` configures `npm run build` and output directory `dist`.
4. Select Node.js 24.x and deploy. No environment variables are required.

Subsequent pushes to the connected production branch trigger Vercel deployments. Environment publication and website deployment are separate actions.
