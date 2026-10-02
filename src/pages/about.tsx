/** @jsx h */
import { h, render } from "../runtime/jsx";
import { Navbar, LEADERS, TeamCard } from "../components/Layout";

// About page source (no React). See about.html for full markup.
export function AboutPage() {
  return (
    <fragment>
      {Navbar("about")}
      <main>
        <h1>About Celta Group Digital</h1>
        <div class="grid g3">{LEADERS.map(TeamCard)}</div>
      </main>
    </fragment>
  );
}
if (typeof document !== "undefined" && document.getElementById("app")) {
  render(AboutPage() as any, document.getElementById("app"));
}
