/** Renders data/ongoing_projects.json (array of ongoing projects). */
Site.load("./data/ongoing_projects.json", "projects-container", (container, projects) => {
  projects.forEach(({ title, collaborators, quote, description }) => {
    const item = Site.el("div", "item");
    item.appendChild(Site.el("p", "item-title", title));

    if (collaborators) {
      item.appendChild(Site.el("p", "item-meta", collaborators));
    }

    if (quote) {
      const blockquote = Site.el("blockquote", "item-quote");
      blockquote.appendChild(Site.el("p", "item-quote-text", quote.text));
      if (quote.attribution) {
        blockquote.appendChild(
          Site.el("footer", "item-quote-attribution", `— ${quote.attribution}`)
        );
      }
      item.appendChild(blockquote);
    }

    if (description) {
      item.appendChild(Site.el("p", "item-description", description));
    }

    container.appendChild(item);
  });
});
