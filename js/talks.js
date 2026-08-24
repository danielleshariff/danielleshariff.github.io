/**
 * Renders data/talks.json (array of talks, newest first) as a timeline.
 */
Site.load("./data/talks.json", "talks-container", (container, talks) => {
  talks.forEach(({ title, location, date, link }) => {
    const item = Site.el("div", "presentation-entry");

    if (date) item.appendChild(Site.el("p", "presentation-date", date));

    const heading = Site.el("p", "presentation-title");
    if (link) heading.appendChild(Site.link(link, title));
    else heading.textContent = title;
    item.appendChild(heading);

    if (location) item.appendChild(Site.el("p", "presentation-location", location));

    container.appendChild(item);
  });
});
