(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (!window.posthog) return;

    const dumpEl = document.querySelector("[data-dump-id]");
    const dumpId = dumpEl ? dumpEl.getAttribute("data-dump-id") : "unknown";

    // Dump view
    posthog.capture("teddy_dump_view", {
      dump_id: dumpId,
      page: window.location.pathname
    });

    // Scroll depth tracking
    let scrollMarks = { 25: false, 50: false, 75: false, 100: false };

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach(mark => {
        if (scrollPercent >= mark && !scrollMarks[mark]) {
          scrollMarks[mark] = true;
          posthog.capture("teddy_scroll_depth", {
            dump_id: dumpId,
            percent: mark
          });
        }
      });
    });

    // Image clicks
    document.querySelectorAll("img").forEach((img, index) => {
      img.addEventListener("click", () => {
        posthog.capture("teddy_image_click", {
          dump_id: dumpId,
          image_index: index
        });
      });
    });

    // Video plays
    document.querySelectorAll("video").forEach((video, index) => {
      video.addEventListener("play", () => {
        posthog.capture("teddy_video_play", {
          dump_id: dumpId,
          video_index: index
        });
      });
    });
  });
})();
