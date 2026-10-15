/** @jsx h */
import { boot } from "../runtime/boot.js";
import { h } from "../runtime/jsx.js";
import { Header, PageEffects, Footer, ToTop } from "../components/Layout.js";
import { ArrowNE, DownloadIcon } from "../components/Icons.js";
import { PAGE_NAV, COACH, DOWNLOAD_NOTES } from "../data/site.js";

function PageHero() {
  return (
    <section class="page-hero">
      <div class="site-container">
        <p class="eyebrow-sm">Downloads</p>
        <h1>Our software downloads.</h1>
        <p class="lead">
          All official software from VELTRION will be published here. Please only download from this
          page to stay safe.
        </p>
      </div>
    </section>
  );
}

function SoftwareSection() {
  return (
    <section class="section" id="software">
      <div class="site-container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Official releases</p>
          <h2>Software</h2>
          <p>New versions appear on this page automatically once published.</p>
        </div>
        <div class="section-body">
          {/* To add more software later, copy the .card block below inside #softwareList. */}
          <div id="softwareList" class="grid-hairline cols-3" data-stagger>
            <article class="cell card col-span-2" data-reveal>
              <div class="cell-top">
                <span class="cell-num">{COACH.num}</span>
                <span class="arrow" aria-hidden="true">
                  <ArrowNE />
                </span>
              </div>
              <h3>{COACH.name}</h3>
              <p>{COACH.desc}</p>
              <div class="dl-meta">
                <span class="tag" id="coachVer">{COACH.version}</span>
                <span class="tag">{COACH.platform}</span>
                <span class="tag" id="coachSize">{COACH.size}</span>
              </div>
              <div class="dl-actions">
                <a class="btn btn-primary btn-sm" id="coachDl" href={COACH.downloadUrl}>
                  Download for Windows
                  <DownloadIcon />
                </a>
                <a class="btn btn-outline btn-sm" href={COACH.releasesUrl}>All versions</a>
              </div>
            </article>
            <article class="cell" data-reveal>
              <h3 style="margin-top:0">A note for customers</h3>
              <ul class="list" style="margin-top:24px">
                {DOWNLOAD_NOTES.map((n) => (
                  <li>{n}</li>
                ))}
              </ul>
            </article>
          </div>

          <div class="empty" id="emptyNotice">
            <h2>No software available yet</h2>
            <p>
              We are preparing our first releases. Please check back soon — new software will appear
              here automatically once published.
            </p>
            <div class="actions">
              <a class="btn btn-light" href="about.html">Learn About Us</a>
              <a class="btn btn-outline" href="index.html">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DownloadPage() {
  return (
    <fragment>
      <a class="skip" href="#main">Skip to content</a>
      <PageEffects />
      <Header variant="sticky" nav={PAGE_NAV} menu={PAGE_NAV} />
      <main id="main">
        <PageHero />
        <SoftwareSection />
      </main>
      <ToTop />
      <Footer teamHref="about.html#team" />
    </fragment>
  );
}

const mount = typeof document !== "undefined" ? document.getElementById("app") : null;
if (mount) {
  boot(DownloadPage);
}
