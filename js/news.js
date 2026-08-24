/** Renders data/news.json (array of news items, newest first) as a dated list. */
Site.load("./data/news.json", "news-container", (container, items) => {
  items.forEach(({ date, text, link }) => {
    const item = Site.el("div", "news-item");
    if (date) item.appendChild(Site.el("span", "news-date", date));

    const textEl = Site.el("span", "news-text");
    if (link) textEl.appendChild(Site.link(link, text));
    else textEl.textContent = text;
    item.appendChild(textEl);

    container.appendChild(item);
  });
});
