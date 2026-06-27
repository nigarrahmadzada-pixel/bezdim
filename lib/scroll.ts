const SCROLL_GAP = 16;

export function getHeaderOffset(): number {
  const header = document.querySelector("header");
  return (header?.offsetHeight ?? 72) + SCROLL_GAP;
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, behavior });
  return true;
}
