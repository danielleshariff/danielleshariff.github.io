# Data File Schemas

Schemas and examples for every file under `data/`. Optional fields are marked; each file is rendered by the matching `js/*.js` module.

> **Note:** These schemas describe the template as shipped. If the site has been redesigned (via `/setup-site` or manually), the live `data/*.json` files and `js/*.js` renderers are the ground truth. When they diverge from this file, follow the code and update this file to match.

> **Current site structure:** this site is multi-page, not the template's default single scrolling page. `index.html` (About — profile card plus `data/education.json` below it), `projects.html` (Ongoing Projects), `presentations.html` (Presentations — renders `data/talks.json` via `js/talks.js`), `publications.html`, and `cv.html` each have their own HTML file sharing one header/nav/footer (set from `data/profile.json` by `Site.loadChrome()` in `js/utils.js`). `data/news.json`, `data/working_papers.json`, `data/software.json`, and `data/teaching.json` still exist with their renderers but are not currently linked from any page — add a page for one (following the pattern of the existing pages) to bring it back.

## data/profile.json — name, bio, links

Object. Rendered by `js/profile.js` (also sets the page title, nav name, and footer).

```json
{
  "name": "Dr. Jane Placeholder",
  "title": "Assistant Professor of Something Interesting",
  "affiliation": "University of Somewhere",
  "photoPath": "./assets/images/headshot.svg",
  "bio": [
    "First paragraph of the bio.",
    "Second paragraph of the bio."
  ],
  "links": [
    { "label": "Google Scholar", "url": "https://scholar.google.com/..." },
    { "label": "Email", "url": "mailto:jane@example.edu" }
  ],
  "cvPath": "./docs/cv.pdf"
}
```

- `bio` is an array of paragraphs.
- Optional: `photoPath` (omit to render without a photo).
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

Array of year groups, newest year first; items within a year are newest first. Rendered by `js/news.js`.

```json
{
  "year": "2026",
  "items": [
    {
      "type": "Preprint",
      "htmltext": "New preprint: <a href='https://doi.org/...' target='_blank'>Paper Title</a>."
    }
  ]
}
```

- `type` is one of: `Publication`, `Preprint`, `Talk`, `Award`, `Media`, `Tool`, `General`.
- `htmltext` conventions: single-quoted HTML attributes; links as `<a href='URL' target='_blank'>`; `<em>` for venues; `<code>` for software names. 1–2 sentences, professional tone, emojis only for big milestones.
- Per-type patterns:
  - Publication: `Our paper <a>Title</a> was published in <em>Journal</em>.`
  - Preprint: just the linked title: `New preprint: <a>Title</a>.`
  - Talk: `Gave an invited talk at <a>Event</a>...` or `...accepted for a poster/talk at <a>Conf</a>.`
  - Award: `Honored to receive [award] from <a>Org</a>.`
  - Media: `<a>Outlet</a> covered our paper <a>Title</a>.`
  - Tool: `Created <a><code>name</code></a> — description.`

## data/talks.json — talks and presentations

Array, newest first. Rendered by `js/talks.js` on `presentations.html` as a vertical timeline (same visual pattern as Education). Each entry's dot and title are colored automatically by the year parsed from `date`: 2021-2025 (UC Irvine era) renders in blue (`#87CEFA`), 2026 onward (Northeastern era) renders in red (`#CD5555`) — see `colorForTalkDate()` in `js/talks.js`. Update that function if the era cutoff or colors ever change.

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
