/** @jsx h */
import { h, render } from "../runtime/jsx";
import { Navbar } from "../components/Layout";

// Downloads page source (no React). Intentionally empty:
// add software cards inside #softwareList in download.html when ready.
export function DownloadPage() {
  return (
    <fragment>
      {Navbar("download")}
      <main>
        <h1>Our software downloads.</h1>
        <div id="softwareList" class="software-grid"></div>
        <div class="empty"><h2>No software available yet</h2></div>
      </main>
    </fragment>
  );
}
if (typeof document !== "undefined" && document.getElementById("app")) {
  render(DownloadPage() as any, document.getElementById("app"));
}
