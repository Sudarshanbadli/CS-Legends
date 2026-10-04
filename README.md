# CS Legends — The People Behind Computing

> A visual, open educational encyclopedia celebrating the people who shaped computer science and modern computing.

**Repository:** `CS-Legends`  
**Collection:** 300+ named personalities (deduplicated by profile slug)  
**Website:** GitHub Pages-ready, static HTML/CSS/JavaScript  
**Maintainer:** Sudarshan Badli

## What is included

- Searchable directory with field filters, country filter, honorary-title filter, and profile detail modal.
- 300+ starter personality records in `data/people.json`.
- Historical context and cross-disciplinary tags.
- Portrait licensing workflow, image-credit register, and Commons search links.
- Responsive Apple-inspired glass interface with dark/light mode.
- GitHub Pages deployment workflow.
- Contribution, citation, and image-rights policies.

## Important editorial note

This repository distinguishes **documented achievements** from **popular honorary labels**. Titles such as “Father of AI” are not official credentials and may be contested or shared. Every profile must be supported by reliable sources. The initial dataset is a research-ready catalogue, not a claim that all 300+ entries already contain fully fact-checked, publication-grade biographies. Some entries intentionally say “Research required”; expand these before describing the entire catalogue as verified.

## Run locally

No build tools or dependencies are required.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. For local development, use VS Code Live Server or `python -m http.server 8000`.

## Publish on GitHub Pages

1. Create a public repository named **CS-Legends**.
2. Upload all files from this project to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push to `main`; `.github/workflows/pages.yml` deploys the static site.
6. Your site will be available at `https://YOUR-USERNAME.github.io/CS-Legends/`.

GitHub Pages serves static files; no server-side runtime is required.

## Portrait and copyright policy

**Do not download an image merely because it appears in search results.** A portrait is publishable only when its individual file page clearly states a compatible licence or public-domain status and all required conditions can be met.

Preferred sources:
- Wikimedia Commons file pages with explicit licence metadata.
- Public-domain institutional archives.
- University, museum, or government archives that expressly permit reuse.

For every portrait, record:
- Subject name
- Exact file-page URL (not just the image URL)
- Creator/photographer
- Licence and version
- Required attribution text
- Source institution
- Date checked
- Any modifications

See `IMAGE_CREDITS.csv` and `docs/IMAGE_POLICY.md`. Portraits are not bundled by default because the rights of individual historical photographs vary. The interface displays a typographic placeholder until a credited portrait is added. This avoids silently redistributing copyrighted photographs.

## Reliable research sources

- IEEE Computer Society, *Computer Pioneers*: https://history.computer.org/pioneers/index.html
- ACM A.M. Turing Award: https://amturing.acm.org/
- Computer History Museum: https://www.computerhistory.org/
- ACM History Committee: https://history.acm.org/
- Wikimedia Commons (check each file's licence): https://commons.wikimedia.org/

Use primary papers, institutional biographies, oral histories, archived interviews, patents, and award citations whenever possible. Wikipedia can help discover names, but should not be the sole citation for a profile.

## Repository structure

```text
CS-Legends/
├── index.html
├── styles.css
├── app.js
├── data/people.json
├── assets/portraits/          # only cleared portraits
├── docs/
│   ├── EDITORIAL_POLICY.md
│   ├── IMAGE_POLICY.md
│   └── SOURCES.md
├── .github/workflows/pages.yml
├── IMAGE_CREDITS.csv
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
└── README.md
```

## Add a portrait

1. Confirm the individual image file's reuse licence.
2. Download it into `assets/portraits/` with a descriptive filename.
3. Add the image URL/path and alt text to that person's JSON record.
4. Add a complete row to `IMAGE_CREDITS.csv`.
5. If the licence requires attribution or share-alike, comply exactly.
6. If rights are unclear, do not add the image.

## Licence

Original code and original editorial scaffolding: MIT License.  
Third-party images, quotations, and source materials are **not** covered by the MIT licence; each retains its own rights and licence.
