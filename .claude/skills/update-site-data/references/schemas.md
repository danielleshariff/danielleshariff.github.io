# Data File Schemas

Schemas and examples for every file under `data/`. Optional fields are marked; each file is rendered by the matching `js/*.js` module.

> **Note:** These schemas describe the template as shipped. If the site has been redesigned (via `/setup-site` or manually), the live `data/*.json` files and `js/*.js` renderers are the ground truth. When they diverge from this file, follow the code and update this file to match.

> **Current site structure:** this site is multi-page, not the template's default single scrolling page. `index.html` (About — profile card, then `data/education.json` via `js/education.js`, then `data/news.json` via `js/news.js`, in that order), `projects.html` (Ongoing Projects), `presentations.html` (Presentations — renders `data/talks.json` via `js/talks.js`), `publications.html`, and `cv.html` each have their own HTML file sharing one header/nav/footer (set from `data/profile.json` by `Site.loadChrome()` in `js/utils.js`). News does not have its own nav entry/page — it's a section on the About page, below Education. `data/working_papers.json`, `data/software.json`, and `data/teaching.json` still exist with their renderers but are not currently linked from any page — add a page for one (following the pattern of the existing pages) to bring it back.

## data/profile.json — name, bio, links

Object. Rendered by `js/profile.js` (also sets the page title, nav name, and footer).

```json
{
  "name": "Dr. Jane Placeholder",
  "title": "Assistant Professor of Something Interesting",
  "affiliation": "University of Somewhere",
  "photoPath": "./assets/images/headshot.svg",
  "researchInterests": ["Political Communication", "Computational Methods", "Human Rights"],
  "bio": [
    "First paragraph of the bio.",
    "Second paragraph of the bio."
  ],
  "links": [
    { "label": "Google Scholar", "url": "https://scholar.google.com/..." },
    { "label": "jane [at] example.edu", "url": "mailto:jane@example.edu" }
  ],
  "cvPath": "./docs/cv.pdf"
}
```

- `bio` is an array of paragraphs.
- Optional: `photoPath` (omit to render without a photo).
- Optional: `researchInterests` — array of short phrases rendered above the name as an all-caps, dot-separated eyebrow line (styled via `.profile-eyebrow`); omit to hide it. Keep entries in normal title case in the JSON — CSS handles the uppercase transform.
- A link's `label` renders as-is (no obfuscation logic), so for an email link write the human-readable "[at]" form directly in `label` (e.g. `"jane [at] example.edu"`) if you want it easy to read/copy while `url` keeps the real `mailto:` address.
- Optional: `cvPath` — drives the CV page (`cv.html` / `js/cv.js`): when present, the page embeds the PDF and shows a download button; when absent, it shows a "CV coming soon" placeholder. Drop the PDF at `docs/cv.pdf` and add this field to activate it.
- `affiliation` is accepted but currently unused by `js/profile.js` — the line under the name renders `title` only (e.g. "PhD Student"), not `title, affiliation`. Keep `affiliation` in the data (harmless) or fold it into `title` if you want it displayed again.

## data/education.json — degrees

Array, newest/current degree first. Rendered by `js/education.js` on the About page as a vertical timeline (a connecting line with a dot per entry; date, degree, institution stacked within each entry).

```json
{
  "degree": "Ph.D. in Political Science",
  "institution": "Northeastern University",
  "institutionColor": "#CD5555",
  "dates": "2025 – 2030"
}
```

- Optional: `institutionColor` (a hex/CSS color string) — tints that entry's institution name; omit to fall back to the theme's accent color.

## data/publications.json — published papers

Array, ordered by year (newest first). Rendered by `js/publications.js`.

```json
{
  "title": "A very important finding about an interesting phenomenon",
  "authors": "Jane Placeholder, Collaborator One, Collaborator Two",
  "publication": "Journal of Important Findings",
  "year": "2025",
  "url": "https://doi.org/10.0000/example.2025",
  "pdfPath": "./docs/publications/2025_Placeholder_ImportantFinding/2025_Placeholder_ImportantFinding.pdf",
  "bibPath": "./docs/publications/2025_Placeholder_ImportantFinding/cite.bib"
}
```

- `year` is a string. `url` is the canonical DOI/publisher link.
- Optional: `pdfPath`, `bibPath` (links only render when present).
- Shared-first-authorship is marked with `†` after author names.

## data/working_papers.json — preprints / under review

Array, newest first. Rendered by `js/working_papers.js`.

```json
{
  "title": "A new preprint that is currently under review",
  "authors": "Jane Placeholder, Collaborator Three",
  "url": "https://doi.org/10.48550/arXiv.0000.00000",
  "id": "modal_placeholder_preprint",
  "pdfPath": "./docs/publications/0_Placeholder_NewPreprint/0_Placeholder_NewPreprint.pdf",
  "bibPath": "./docs/publications/0_Placeholder_NewPreprint/cite.bib"
}
```

- `id` is a unique identifier: `modal_[lowercase_short_identifier]` (author name + key title word).
- Optional: `pdfPath`, `bibPath`, `publication` (status note, e.g. `"Under review at Journal X"`).

## data/news.json — news items

Array, newest first. Rendered by `js/news.js` on the About page (`index.html`), below Education, as a dated list (`.news-date` + `.news-text`, flat/unbulleted). The section shows "Recent and upcoming" as a `.section-note` under the "News" heading (rendered fully uppercase via CSS, source text stays normal case), borrowed from yingdanlu.com's News section.

```json
{
  "date": "August 2026",
  "text": "Participated at the Summer Institute in Computational Social Sciences at Stanford University.",
  "link": "https://example.edu"
}
```

- `date` is a free-form string (e.g. `"August 2026"`); shown in a fixed-width muted column to the left of `text`.
- `text` is plain text, 1 sentence, professional tone.
- Optional: `link` — when present, the whole `text` becomes a link (opens in a new tab); omit for a plain unlinked entry.

## data/talks.json — talks and presentations

Array, newest first. Rendered by `js/talks.js` on `presentations.html` as a vertical timeline (same visual pattern as Education). All entries render in the theme's green accent color (dot and title) — see `#presentations .presentation-title` in `css/styles.css`.

```json
{
  "title": "A very important finding about an interesting phenomenon",
  "location": "Workshop on Interesting Things, University of Somewhere",
  "date": "2026",
  "link": "https://example.edu"
}
```

- `date` is a year string (a fuller date like `"March 2026"` also works).
- Optional: `link` (title renders as plain text without it).

## data/software.json — software and tools

Array. Rendered by `js/software.js`.

```json
{
  "title": "example-package",
  "description": "A Python package that does something useful from the command line.",
  "href": "https://github.com/username/example-package"
}
```

## data/ongoing_projects.json — ongoing projects

Array. Rendered by `js/ongoing_projects.js` on `projects.html`; on that page, titles render in the accent color and the `<h2>` is uppercase black (see `#projects` rules in `css/styles.css`).

```json
{
  "title": "A large ongoing research project",
  "collaborators": "Collaborator: Jane Doe",
  "quote": {
    "text": "An epigraph or excerpt relevant to the project.",
    "attribution": "Author, Source"
  },
  "description": "A multi-year effort to understand an important phenomenon."
}
```

- Optional: `collaborators` — a short line (e.g. `"Collaborator: ..."` or `"Principal Investigators: ..."`) rendered under the title in muted meta style.
- Optional: `quote` — renders as an italicized, left-bordered blockquote above the description, with `attribution` shown as an em-dash-prefixed byline. Omit entirely if there's no epigraph.
- Optional: `description`.

## data/teaching.json — courses taught

Array, newest first. Rendered by `js/teaching.js`.

```json
{
  "title": "Introduction to Interesting Things",
  "role": "Instructor",
  "institution": "University of Somewhere",
  "term": "Spring 2026",
  "description": "An undergraduate introduction to the field."
}
```

- Optional: `description`.

## docs/publications/ directory convention

Each paper has a directory under `docs/publications/` containing its PDF and a `cite.bib`:

- **Working papers (unpublished):** `0_LastName_ShortTitle/` (the `0` prefix means unpublished)
- **Published papers:** `YYYY_LastName_ShortTitle/` (year prefix)
- `ShortTitle` = first 2–3 significant title words, no spaces (e.g., `ImportantFinding`)
