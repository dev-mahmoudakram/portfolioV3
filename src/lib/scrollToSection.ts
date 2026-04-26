function smoothScrollTo(container: HTMLElement, targetTop: number) {
  const start = container.scrollTop;
  const distance = targetTop - start;
  const duration = 520;
  let startTime: number | null = null;

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    container.scrollTop = start + distance * easeInOutCubic(progress);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export function scrollToSection(targetId: string, offset?: number) {
  if (typeof window === "undefined") return;

  const container = document.querySelector<HTMLElement>(".scroll-container") ?? document.documentElement;

  if (targetId === "home") {
    smoothScrollTo(container, 0);
  } else {
    const element = document.getElementById(targetId);
    if (!element) return;

    const navbarHeight = offset ?? (document.querySelector("header nav")?.getBoundingClientRect().height ?? 0);

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetTop = Math.max(container.scrollTop + (elementRect.top - containerRect.top) - navbarHeight, 0);

smoothScrollTo(container, targetTop);
  }

  if (window.location.hash) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}
