/**
 * Renders data/talks.json (array of talks, newest first) as a timeline.
 * Each entry's title/marker is colored by era: 2021-2025 (UC Irvine) in
 * blue, 2026 onward (Northeastern) in red, based on the year in `date`.
 */
const ERA_COLORS = { uci: "#87CEFA", northeastern: "#CD5555" };

function colorForTalkDate(date) {
  const match = /\d{4}/.exec(date || "");
  if (!match) return null;
  const year = parseInt(match[0], 10);
  return year >= 2026 ? ERA_COLORS.northeastern : ERA_COLORS.uci;
}

Site.load("./data/talks.json", "talks-container", (container, talks) => {
  talks.forEach(({ title, location, date, link }) => {
    const item = Site.el("div", "presentation-entry");
    const color = colorForTalkDate(date);
    if (color) item.style.setProperty("--marker-color", color);

    if (date) item.appendChild(Site.el("p", "presentation-date", date));

    const heading = Site.el("p", "presentation-title");
    const titleEl = link ? Site.link(link, title) : null;
    if (titleEl) heading.appendChild(titleEl);
    else heading.textContent = title;
    if (color) (titleEl || heading).style.color = color;
    item.appendChild(heading);

    if (location) item.appendChild(Site.el("p", "presentation-location", location));

    container.appendChild(item);
  });
});
