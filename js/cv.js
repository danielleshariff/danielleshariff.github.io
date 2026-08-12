/** Renders the CV page from data/profile.json's optional cvPath field. */
Site.load("./data/profile.json", "cv-container", (container, profile) => {
  if (!profile.cvPath) {
    container.appendChild(
      Site.el("p", "cv-placeholder", "CV coming soon — check back shortly.")
    );
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.className = "cv-embed";
  iframe.src = profile.cvPath;
  iframe.title = "CV";
  container.appendChild(iframe);

  const download = Site.el("a", "cv-download button", "Download CV (PDF)");
  download.href = profile.cvPath;
  download.setAttribute("download", "");
  container.appendChild(download);
});
