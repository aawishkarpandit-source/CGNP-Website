/** @jsx h */
import { boot } from "../runtime/boot.js";
import { h } from "../runtime/jsx.js";
import { Header, PageEffects, Footer, SectionRail, ToTop } from "../components/Layout.js";
import { ArrowNE, ArrowRight, CheckSmall, ChevronDown } from "../components/Icons.js";
import {
  HERO_NAV,
  HERO_MENU,
  BAND_WORDS,
  BAND_ACCENT,
  GLITCH_WORD,
  SERVICES,
  ACCENT_CELL,
  PROCESS,
  WHY_PILLS,
  WHY_STATS,
  FAQS,
  CTA_LIST,
} from "../data/site.js";

function SectionHead(props: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div class="section-head" data-reveal>
      <p class="eyebrow">{props.eyebrow}</p>
      <h2>{props.title}</h2>
      {props.desc ? <p>{props.desc}</p> : null}
    </div>
  );
}

function BandSeq(props: { accent?: boolean }) {
  const words = props.accent ? BAND_ACCENT : BAND_WORDS;
  return (
    <span class="band-seq">
      {words.map((w) => [
        <span>{w}</span>,
        <i class="dot"></i>,
      ])}
    </span>
  );
}

function Band(props: { accent?: boolean }) {
  return (
    <div class={props.accent ? "band accent" : "band"} aria-hidden="true">
      <div class="band-track">
        <BandSeq accent={props.accent} />
        <BandSeq accent={props.accent} />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section class="hero" id="hero">
      <div class="hero-inner">
        <p class="hero-label">Engineered for What's Next.</p>
        <div class="logo-orb">
          <span class="logo-ring" aria-hidden="true"></span>
          <span class="logo-glow" aria-hidden="true"></span>
          <span class="logo-card">
            <img src="assets/img/logo.png" alt="VELTRION logo" width="120" height="120" />
          </span>
        </div>
        <h1>VELTRION</h1>
        <p class="hero-tagline">
          We build professional websites, custom software and complete business management systems plus design, marketing and ongoing support. Simple process, clear pricing, reliable service.
        </p>
        <p class="hero-sub">{"Software & Digital Technology · For shops, offices & organizations"}</p>
      </div>
      <div class="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <i></i>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section class="section" id="services">
      <div class="site-container">
        <SectionHead
          eyebrow="What we do"
          title="Services"
          desc="Eight practical services — from the first conversation to launch, and the support that keeps everything running."
        />
        <div class="section-body">
          <div class="grid-hairline cols-3" data-stagger>
            {SERVICES.map((s) => (
              <article class="cell" data-reveal>
                <div class="cell-top">
                  <span class="cell-num">{s.num}</span>
                  <span class="arrow" aria-hidden="true">
                    <ArrowNE />
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div class="cell-tags">
                  {s.tags.map((t) => (
                    <span class="tag">{t}</span>
                  ))}
                </div>
              </article>
            ))}
            <article class="cell cell-accent" data-reveal>
              <h3>{ACCENT_CELL.title}</h3>
              <p>{ACCENT_CELL.desc}</p>
              <a class="btn-on-accent" href={ACCENT_CELL.cta.href}>
                {ACCENT_CELL.cta.label}
                <ArrowRight />
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialSection() {
  return (
    <section class="editorial">
      <div class="ed-line" aria-hidden="true"></div>
      <div class="ed-shapes" aria-hidden="true">
        <span class="ed-shape s1"></span>
        <span class="ed-shape s2"></span>
        <span class="ed-shape s3"></span>
        <span class="ed-shape s4"></span>
      </div>
      <div class="site-container">
        <div class="ed-body" data-reveal>
          <p class="eyebrow-sm">( Our approach )</p>
          <div style="margin-top:40px">
            <h2 class="first">Most tools add steps.</h2>
            <h2 class="second">We remove them.</h2>
          </div>
          <p class="lead">
            Clear scope, regular updates and hands-on training practical digital products that are
            easy to use and dependable for modern organizations.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section class="section" id="process">
      <div class="site-container">
        <SectionHead
          eyebrow="How it works"
          title="Process"
          desc="A simple four-step path from first conversation to launch and ongoing care."
        />
        <div class="section-body">
          <div class="grid-hairline cols-4" data-stagger>
            {PROCESS.map((s) => (
              <article class="cell" data-reveal>
                <div class="cell-top">
                  <span class="cell-num">{s.num}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section class="section" id="why">
      <div class="site-container">
        <SectionHead eyebrow="Why choose us" title="Why VELTRION" desc="A reliable partner, not just a seller." />
        <div class="section-body" data-reveal>
          <div class="pills">
            {WHY_PILLS.map((p) => (
              <span class="pill">{p}</span>
            ))}
          </div>
          <p class="micro" style="margin-top:40px">
            What we bring
          </p>
          <div class="stat-grid">
            {WHY_STATS.map((s) => (
              <div class={s.span2 ? "stat span2" : "stat"}>
                <p class="v">{s.num}</p>
                <p class="l">{s.label}</p>
                <p class="d">{s.desc}</p>
              </div>
            ))}
          </div>
          <div class="accent-block">
            <p class="big">Start here.</p>
            <p class="sub">{"Simple process · Clear pricing · Reliable service"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section class="section" id="faq">
      <div class="site-container">
        <SectionHead
          eyebrow="FAQ"
          title="Common Questions"
          desc="Our services, process, pricing approach and support — what to expect when working with VELTRION."
        />
        <div class="section-body">
          <div class="faq" data-stagger>
            {FAQS.map((f, i) => (
              <div class="faq-item" data-reveal>
                <button class="faq-q" type="button" aria-expanded="false" aria-controls={"faq-a" + (i + 1)}>
                  {f.q}
                  <ChevronDown />
                </button>
                <div class="faq-a" id={"faq-a" + (i + 1)} hidden>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section class="section">
      <div class="site-container">
        <div class="section-body" style="padding-top:0" data-reveal>
          <div class="cta-panel">
            <div class="cta-left">
              <p class="eyebrow-sm">( Get started )</p>
              <h2>Engineered for What's Next.</h2>
              <p>
                Websites, software or a complete management system tell us what your business needs
                and we shape a clear plan from there.
              </p>
              <a class="btn-cta" href="download.html">View Our Work</a>
            </div>
            <div class="cta-right">
              <p class="lbl">What you get</p>
              <ul class="cta-list">
                {CTA_LIST.map((item) => (
                  <li>
                    <span class="ic" aria-hidden="true">
                      <CheckSmall />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p class="cta-note">
                All software is published officially on <b>Our Work</b>. Safe files,
                version and size listed for every release.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlitchBand() {
  const items: any[] = [];
  for (let i = 0; i < 8; i++) {
    items.push(<span data-word={GLITCH_WORD}>{GLITCH_WORD}</span>);
    items.push(<i>{"·"}</i>);
  }
  return (
    <div class="glitch" aria-hidden="true">
      <div class="glitch-track">{items}</div>
    </div>
  );
}

function CloserSection() {
  return (
    <section class="section closer" id="start">
      <div class="site-container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Next step</p>
        </div>
      </div>
      <div class="closer-body" data-reveal>
        <h2 data-split>Let's build.</h2>
        <a class="btn btn-primary" href="download.html">
          View Our Work
          <ArrowRight />
        </a>
        <p class="closer-sub">{"Software & Digital Technology · Engineered for What's Next."}</p>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <fragment>
      <a class="skip" href="#main">Skip to content</a>
      <PageEffects />
      <Header variant="hero" nav={HERO_NAV} menu={HERO_MENU} />
      <main id="main">
        <HeroSection />
        <Band />
        <ServicesSection />
        <EditorialSection />
        <Band accent />
        <ProcessSection />
        <WhySection />
        <FaqSection />
        <CtaSection />
        <GlitchBand />
        <CloserSection />
      </main>
      <SectionRail />
      <ToTop />
      <Footer teamHref="about.html#team" />
    </fragment>
  );
}

const mount = typeof document !== "undefined" ? document.getElementById("app") : null;
if (mount) {
  boot(HomePage);
}
