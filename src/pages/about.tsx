/** @jsx h */
import { boot } from "../runtime/boot.js";
import { h } from "../runtime/jsx.js";
import { Header, PageEffects, Footer, ToTop } from "../components/Layout.js";
import { PAGE_NAV, TEAM, ORG_NOTE, COMPANY_ROWS } from "../data/site.js";

function PageHero() {
  return (
    <section class="page-hero">
      <div class="site-container">
        <p class="eyebrow-sm">About our company</p>
        <h1>A company that understands business.</h1>
        <p class="lead">
          <b>VELTRION</b> is a technology company. We provide websites, software and digital services
          for businesses, organizations and individuals — practical solutions that are easy to use and
          dependable.
        </p>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section class="section" id="vision">
      <div class="site-container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Who we are</p>
          <h2>{"Vision & Mission"}</h2>
          <p>What we want to achieve, and how we work to get there.</p>
        </div>
        <div class="section-body">
          <div class="split-2" data-stagger>
            <div class="panel" data-reveal>
              <p class="eyebrow-sm">Our vision</p>
              <h3>Reliable and accessible software for every business.</h3>
              <p class="lead">
                To build reliable, modern and accessible software solutions that help businesses grow
                and operate digitally.
              </p>
            </div>
            <div class="panel" data-reveal>
              <p class="eyebrow-sm">Our mission</p>
              <h3>Technology with a human touch.</h3>
              <p class="lead">
                To combine technology, creativity and business understanding to develop practical
                digital products for modern organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section class="section" id="team">
      <div class="site-container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">The people</p>
          <h2>Team</h2>
          <p>Clear roles, so you always know who is looking after your project.</p>
        </div>
        <div class="section-body">
          <div class="team-grid" data-stagger>
            {TEAM.map((m) => (
              <article class="member" data-reveal>
                <div class="member-photo">
                  <span class="initials">{m.initials}</span>
                </div>
                <div class="member-info">
                  <h3>{m.name}</h3>
                  <p class="role">{m.role}</p>
                  <p class="bio">{m.bio}</p>
                </div>
              </article>
            ))}
            <article class="member" data-reveal>
              <div class="member-info" style="padding:40px 24px">
                <h3>{ORG_NOTE.title}</h3>
                <p class="bio">{ORG_NOTE.bio}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanySection() {
  return (
    <section class="section" id="company">
      <div class="site-container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">At a glance</p>
          <h2>Company</h2>
        </div>
        <div class="section-body" data-reveal>
          <div class="table-wrap">
            <table>
              <tbody>
                <tr>
                  <th>Topic</th>
                  <th>Details</th>
                </tr>
                {COMPANY_ROWS.map((r) => (
                  <tr>
                    <td>
                      <b>{r.topic}</b>
                    </td>
                    <td>{r.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <fragment>
      <a class="skip" href="#main">Skip to content</a>
      <PageEffects />
      <Header variant="sticky" nav={PAGE_NAV} menu={PAGE_NAV} />
      <main id="main">
        <PageHero />
        <VisionSection />
        <TeamSection />
        <CompanySection />
      </main>
      <ToTop />
      <Footer teamHref="#team" />
    </fragment>
  );
}

const mount = typeof document !== "undefined" ? document.getElementById("app") : null;
if (mount) {
  boot(AboutPage);
}
