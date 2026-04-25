export function scrollToSection(targetId: string, offset?: number) {
  if (typeof window === "undefined") return;

  const container = document.querySelector<HTMLElement>(".scroll-container") ?? document.documentElement;

  if (targetId === "home") {
    container.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const element = document.getElementById(targetId);
    if (!element) return;

    const navbarHeight = offset ?? (document.querySelector("header")?.getBoundingClientRect().height ?? 0);
    const targetTop = element.getBoundingClientRect().top + container.scrollTop - navbarHeight;
    container.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  }

  if (window.location.hash) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}
