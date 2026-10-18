/**
 * VELTRION — site behaviors (no frameworks).
 * Navigation, page effects, reveal, FAQ accordion, section rail,
 * back-to-top, downloads wiring (GitHub release auto-upgrade).
 * Ported 1:1 from the former assets/js/main.js.
 * Call initSite() once, AFTER the page has rendered into #app.
 */

export function initSite(): void {
  const $ = <S extends Element = Element>(sel: string, root?: ParentNode): S | null =>
    ((root ?? document).querySelector(sel) as S | null);
  const $$ = <S extends Element = Element>(sel: string, root?: ParentNode): S[] =>
    Array.from((root ?? document).querySelectorAll(sel)) as S[];

  const reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Year ----------
  $$("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // ---------- Mobile menu ----------
  const burger = $<HTMLButtonElement>("#hamburger");
  const menu = $<HTMLElement>("#navMenu");
  const closeMenu = (): void => {
    if (!menu || !burger) return;
    menu.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    burger.textContent = "Menu";
  };
  if (burger && menu) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = menu.hidden;
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.textContent = open ? "Close" : "Menu";
    });
    $$<HTMLAnchorElement>("a", menu).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("click", (e) => {
      const t = e.target as Node | null;
      if (!menu.hidden && t && !menu.contains(t) && t !== burger) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // ---------- Highlight current page ----------
  // Normalizes both sides ("about" vs "about.html") so highlighting also
  // works on the deployed cleanUrls routes (/about, /download).
  try {
    const seg = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const file = seg.replace(/\.html$/, "") || "index";
    $$<HTMLAnchorElement>("a[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href.indexOf("#") !== -1) return;
      const base = href.split("#")[0].replace(/\.html$/, "");
      if (base && base === file) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  } catch (e) {
    /* no-op */
  }

  // ---------- Reveal on scroll ----------
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io?.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
  }
  $$("[data-reveal]").forEach((el) => {
    const group = el.closest("[data-stagger]");
    if (group) {
      const idx = $$("[data-reveal]", group).indexOf(el);
      if (idx > -1) (el as HTMLElement).style.transitionDelay = Math.min(idx, 8) * 70 + "ms";
    }
    if (io) io.observe(el);
    else el.classList.add("in");
  });

  // ---------- Scroll-driven: progress bar, header fade, section rail, back-to-top ----------
  const progress = $<HTMLElement>("#progress");
  const heroHead = $<HTMLElement>(".hero-head");
  const hero = $<HTMLElement>("#hero");
  const sectionNav = $<HTMLElement>("#sectionNav");
  const toTop = $<HTMLButtonElement>("#toTop");
  let ticking = false;

  const onScroll = (): void => {
    const y = window.pageYOffset || document.documentElement.scrollTop;

    // Reading progress bar
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    }

    // Hero header fades away with the hero (as in the reference)
    if (heroHead && hero) {
      const hh = hero.offsetHeight * 0.75;
      const p = hh ? Math.min(y / hh, 1) : 0;
      if (y > 10) {
        heroHead.style.opacity = String(1 - p);
        heroHead.style.visibility = p >= 1 ? "hidden" : "visible";
      } else {
        heroHead.style.opacity = "";
        heroHead.style.visibility = "";
      }
    }

    // Back to top
    if (toTop) toTop.classList.toggle("show", y > 600);

    // Section rail: highlight the section nearest 45% of the viewport
    if (sectionNav) {
      const links = $$<HTMLAnchorElement>("a", sectionNav);
      let best: HTMLAnchorElement | null = null;
      let bestD = Infinity;
      const anchor = window.innerHeight * 0.45;
      links.forEach((a) => {
        const id = (a.getAttribute("href") || "").slice(1);
        const sec = id ? document.getElementById(id) : null;
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const d = Math.abs(r.top + r.height / 2 - anchor);
        if (d < bestD) {
          bestD = d;
          best = a;
        }
      });
      links.forEach((a) => a.classList.toggle("active", a === best));
    }
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }

  // ---------- Giant closer heading: per-letter hover (reference pattern) ----------
  $$("[data-split]").forEach((el) => {
    if (el.querySelector(".ltr")) return;
    const text = el.textContent || "";
    const frag = document.createDocumentFragment();
    text.split("").forEach((ch) => {
      const s = document.createElement("span");
      s.className = "ltr";
      s.textContent = ch === " " ? "\u00a0" : ch;
      frag.appendChild(s);
    });
    el.textContent = "";
    el.appendChild(frag);
  });

  // ---------- FAQ accordion ----------
  $$(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      $$(".faq-q").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const panel = document.getElementById(b.getAttribute("aria-controls") || "");
        if (panel) (panel as HTMLElement).hidden = true;
      });
      if (!open) {
        btn.setAttribute("aria-expanded", "true");
        const target = document.getElementById(btn.getAttribute("aria-controls") || "");
        if (target) (target as HTMLElement).hidden = false;
      }
    });
  });

  // ---------- Cursor spotlight (desktop pointers only) ----------
  const spot = $<HTMLElement>("#spotlight");
  if (
    spot &&
    !reduced &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    let sx = -500;
    let sy = -500;
    let pending = false;
    window.addEventListener(
      "mousemove",
      (e) => {
        sx = e.clientX;
        sy = e.clientY;
        if (!pending) {
          pending = true;
          window.requestAnimationFrame(() => {
            spot.style.left = sx + "px";
            spot.style.top = sy + "px";
            pending = false;
          });
        }
      },
      { passive: true }
    );
  }

  // ---------- Glitch band (character scramble) ----------
  const glitchWords = $$(".glitch-track [data-word]");
  if (glitchWords.length && !reduced) {
    const pool = "!<>-_\\/[]{}=+*^?#";
    window.setInterval(() => {
      glitchWords.forEach((el) => {
        const base = el.getAttribute("data-word") || "";
        const chars = base.split("");
        if (Math.random() < 0.35) {
          const n = 1 + Math.floor(Math.random() * 3);
          for (let i = 0; i < n; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            chars[idx] = pool[Math.floor(Math.random() * pool.length)];
          }
        }
        el.textContent = chars.join("");
      });
    }, 320);
  }

  // ---------- Our Work page: empty notice ----------
  // If no .card elements exist inside #softwareList, show the empty notice.
  // To publish software later, add .card elements inside #softwareList.
  const list = $("#softwareList");
  const empty = $<HTMLElement>("#emptyNotice");
  if (list && empty) {
    empty.style.display = list.querySelector(".card") ? "none" : "block";
  }

  // ---------- Coach Dashboard: pinned to v1.0.9 in download page; the API
  // upgrades the button automatically when a newer release ships. ----------
  try {
    const dl = $<HTMLAnchorElement>("#coachDl");
    const ver = $("#coachVer");
    const fsize = $("#coachSize");
    if (dl && typeof fetch === "function") {
      fetch("https://api.github.com/repos/aawishkarpandit-source/coach-dashboard/releases/latest")
        .then((r) => {
          if (!r.ok) throw new Error("release fetch failed");
          return r.json();
        })
        .then((rel: { assets?: { name: string; browser_download_url: string; size: number }[]; tag_name?: string }) => {
          const exe = (rel.assets || []).filter((a) => /\.exe$/i.test(a.name))[0];
          if (!exe) return;
          dl.href = exe.browser_download_url;
          if (ver && rel.tag_name) ver.textContent = rel.tag_name;
          if (fsize && exe.size) fsize.textContent = "~" + (exe.size / 1048576).toFixed(1) + " MB";
        })
        .catch(() => {
          /* keep the pinned fallback */
        });
    }
  } catch (e) {
    /* no-op */
  }
}
