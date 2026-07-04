// Injects partials/sidebar.html into any element with id="sidebar",
// marks the current page's nav link active.

async function loadSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  try {
    const res = await fetch("partials/sidebar.html", { cache: "no-store" });
    if (!res.ok) throw new Error(`sidebar fetch failed: ${res.status}`);
    sidebar.innerHTML = await res.text();

    // mark the current page's nav link active
    const current = document.body.dataset.page;
    sidebar.querySelectorAll("nav a[data-page]").forEach((link) => {
      if (link.dataset.page === current) link.classList.add("active");
    });
  } catch (err) {
    // fails closed: page still works, just without the sidebar chrome
    console.error(err);
    sidebar.innerHTML = '<p style="color:#a3a3a3">sidebar failed to load</p>';
  }
}

loadSidebar();