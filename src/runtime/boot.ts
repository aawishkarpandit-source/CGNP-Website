/**
 * Page boot: render a page into #app, then wire behaviors.
 * Fail-safe contract (never leave a blank page):
 *  - module executing proves JS works  → ensure the `js` class (hides boot fallback)
 *  - render throws with an empty #app   → drop `js` → boot fallback becomes visible
 *  - behaviors throw                   → force-reveal every [data-reveal] element
 * The inline shell watchdog covers the case where this module never loads at all.
 */
import { render } from "./jsx.js";
import { initSite } from "./behaviors.js";

export function boot(build: () => any): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.add("js");

  const app = document.getElementById("app");
  if (!app) return;

  try {
    render(build(), app);
  } catch (e) {
    if (!app.childElementCount) root.classList.remove("js"); // reveal the fallback
    return;
  }

  try {
    initSite();
  } catch (e) {
    // Behaviors failed: content must still be visible.
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
  }
}
