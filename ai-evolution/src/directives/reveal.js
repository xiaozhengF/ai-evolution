const observerKey = Symbol("revealObserver");

function isReducedMotionPreferred() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default {
  mounted(element) {
    if (typeof window === "undefined") {
      element.classList.add("is-visible");
      return;
    }

    if (isReducedMotionPreferred() || typeof IntersectionObserver === "undefined") {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    element[observerKey] = observer;
  },
  unmounted(element) {
    if (element[observerKey]) {
      element[observerKey].disconnect();
      delete element[observerKey];
    }
  },
};
