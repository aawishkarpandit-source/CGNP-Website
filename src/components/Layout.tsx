/** @jsx h */
import { h } from "../runtime/jsx.js";
import { ArrowUp } from "./Icons.js";
import { FOOTER_SERVICES, RAIL, type NavItem } from "../data/site.js";

/* ---------- Brand ---------- */
function removeLogo(e: Event): void {
  const t = e.target as HTMLElement | null;
  if (t && t.parentNode) t.parentNode.removeChild(t);
}

function LogoChip() {
  return (
    <span class="logo-chip">
      <img src="assets/img/logo.png" alt="" onerror={removeLogo} />
      LOGO
    </span>
  );
}

/* ---------- Page effects (progress bar, ambient glow, cursor spotlight) ---------- */
export function PageEffects() {
  return (
    <fragment>
      <div class="progress" id="progress" aria-hidden="true"></div>
      <div class="ambient" aria-hidden="true">
        <span class="a1"></span>
        <span class="a2"></span>
        <span class="a3"></span>
      </div>
      <div class="spotlight" id="spotlight" aria-hidden="true"></div>
    </fragment>
  );
}

/* ---------- Header ---------- */
export function Header(props: { variant: "hero" | "sticky"; nav: NavItem[]; menu: NavItem[] }) {
  const hero = props.variant === "hero";
  return (
    <header class={hero ? "hero-head" : "site-header"}>
      <div class="site-container">
        <a class="brand" href="index.html" aria-label="VELTRION home">
          <LogoChip />
          <span class="brand-name">VELTRION</span>
        </a>
        <nav class={hero ? "mainnav hero-nav" : "mainnav"} aria-label="Main">
          {props.nav.map((it) => (
            <a href={it.href}>{it.label}</a>
          ))}
        </nav>
        <div class="head-actions">
          <a class="nav-pill" href="download.html">Our Work</a>
          <button class="menu-btn" id="hamburger" aria-expanded="false" aria-controls="navMenu">Menu</button>
        </div>
      </div>
      <div class="mobile-menu" id="navMenu" hidden>
        <ul>
          {props.menu.map((it) => (
            <li>
              <a href={it.href}>{it.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

/* ---------- Section side rail (home) ---------- */
export function SectionRail() {
  return (
    <nav class="section-nav" id="sectionNav" aria-label="Section navigation">
      {RAIL.map((r) => (
        <a href={r.href}>
          <span class="line"></span>
          <span class="txt">
            <span class="n">{r.n}</span>
            <span class="nm">{r.nm}</span>
          </span>
        </a>
      ))}
    </nav>
  );
}

/* ---------- Back to top ---------- */
export function ToTop() {
  return (
    <button class="to-top" id="toTop" aria-label="Back to top">
      <ArrowUp />
    </button>
  );
}

/* ---------- Footer ---------- */
export function Footer(props: { teamHref: string }) {
  return (
    <footer>
      <div class="site-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <LogoChip />
            <p class="name">VELTRION</p>
            <p>Engineered for What's Next. Websites, software, business systems, design, marketing and support.</p>
          </div>
          <nav class="footer-col" aria-label="Footer navigation">
            <h4>Navigate</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="download.html">Our Work</a></li>
              <li><a href={props.teamHref}>Our Team</a></li>
            </ul>
          </nav>
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              {FOOTER_SERVICES.map((s) => (
                <li>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>
            {"© "}<span data-year>2026</span>{" VELTRION. Software & Digital Technology."}
          </p>
          <p>
            <span class="sep">{"·"}</span>{" Engineered for What's Next."}
          </p>
        </div>
      </div>
    </footer>
  );
}
