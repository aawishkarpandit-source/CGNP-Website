/** @jsx h */
import { h } from "../runtime/jsx";

export type Leader = { initials: string; name: string; role: string; detail: string; cls?: string };

export const LEADERS: Leader[] = [
  { initials: "AP", name: "Awishkar Pandit", role: "Chairman & Lead Developer", detail: "Leads the company and oversees software development.", cls: "" },
  { initials: "AB", name: "Abhinav Basnet", role: "Lead Marketing Agent", detail: "Marketing, promotion and new clients.", cls: "a2" },
  { initials: "SB", name: "Sakshyam Basnet", role: "Lead Creative Designer", detail: "Branding and creative design.", cls: "a3" },
  { initials: "PS", name: "Pranjal Sharma", role: "Business Manager", detail: "Operations and client support.", cls: "a4" },
  { initials: "LB", name: "Laxmi Bhandari", role: "Legal Advisor", detail: "Legal guidance.", cls: "a5" },
];

export function TeamCard(l: Leader) {
  return (
    <div class="card">
      <div class="person">
        <div class={"avatar " + (l.cls || "")}>{l.initials}</div>
        <div><b>{l.name}</b><div class="role">{l.role}</div></div>
      </div>
      <p style="margin-top:10px">{l.detail}</p>
    </div>
  );
}

export function Navbar(active: "home" | "about" | "download") {
  const link = (href: string, label: string, key: string) =>
    key === active ? <a href={href} class="active">{label}</a> : <a href={href}>{label}</a>;
  return (
    <nav class="nav"><div class="container nav-inner">
      <a class="brand" href="index.html">
        <span class="logo-box"><img src="assets/img/logo.png" alt="Company logo" />LOGO</span>
        <span class="brand-text"><b>Celta Group Digital</b><span>CG.NP Digital</span></span>
      </a>
      <div class="links" id="navLinks">
        {link("index.html", "Home", "home")}
        {link("about.html", "About Us", "about")}
        {link("download.html", "Downloads", "download")}
      </div>
    </div></nav>
  );
}
