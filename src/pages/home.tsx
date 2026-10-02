/** @jsx h */
import { h, render } from "../runtime/jsx";
import { Navbar, LEADERS, TeamCard } from "../components/Layout";
import { SERVICES, ServiceCard } from "../components/Services";

// Simple business home page (no React). Static index.html holds the full markup;
// this TSX is the matching source for future edits.
export function HomePage() {
  return (
    <fragment>
      {Navbar("home")}
      <main>
        <h1>Digital solutions that help your business grow.</h1>
        <section><div class="grid g4">{SERVICES.map(ServiceCard)}</div></section>
        <section><div class="grid g3">{LEADERS.slice(0, 3).map(TeamCard)}</div></section>
      </main>
    </fragment>
  );
}
if (typeof document !== "undefined" && document.getElementById("app")) {
  render(HomePage() as any, document.getElementById("app"));
}
