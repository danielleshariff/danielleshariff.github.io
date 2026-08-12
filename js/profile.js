/** Renders data/profile.json into the About page's profile card. */
Site.load("./data/profile.json", "profile-container", (container, profile) => {
  const wrapper = Site.el("div", "profile");

  if (profile.photoPath) {
    const img = Site.el("img", "profile-photo");
    img.src = profile.photoPath;
    img.alt = profile.name || "Profile photo";
    wrapper.appendChild(img);
  }

  const body = Site.el("div", "profile-body");
  body.appendChild(Site.el("h1", null, profile.name || ""));

  if (profile.title) body.appendChild(Site.el("p", "profile-role", profile.title));

  (profile.bio || []).forEach((paragraph) => {
    body.appendChild(Site.el("p", "profile-bio", paragraph));
  });

  if (profile.links && profile.links.length) {
    const list = Site.el("ul", "profile-links");
    profile.links.forEach(({ label, url }) => {
      const li = document.createElement("li");
      li.appendChild(Site.link(url, label));
      list.appendChild(li);
    });
    body.appendChild(list);
  }

  wrapper.appendChild(body);
  container.appendChild(wrapper);
});
