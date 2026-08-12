/** Renders data/education.json (array of degrees, newest first). */
Site.load("./data/education.json", "education-container", (container, degrees) => {
  degrees.forEach(({ degree, institution, dates, institutionColor }) => {
    const card = Site.el("div", "education-card");
    card.appendChild(Site.el("p", "education-date", dates));
    card.appendChild(Site.el("p", "education-degree", degree));

    const institutionEl = Site.el("p", "education-institution", institution);
    if (institutionColor) institutionEl.style.color = institutionColor;
    card.appendChild(institutionEl);

    container.appendChild(card);
  });
});
