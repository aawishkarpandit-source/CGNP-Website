// VELTRION — site JS (no frameworks)
// Navigation, page effects, reveal, FAQ accordion, section rail,
// back-to-top, downloads wiring (GitHub release auto-upgrade).
(function(){
  "use strict";
  function $(s,c){ return (c||document).querySelector(s); }
  function $$(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Year ----------
  $$("[data-year]").forEach(function(el){ el.textContent = String(new Date().getFullYear()); });

  // ---------- Mobile menu ----------
  var burger = $("#hamburger"), menu = $("#navMenu");
  function closeMenu(){
    if(!menu || !burger) return;
    menu.hidden = true;
    burger.setAttribute("aria-expanded","false");
    burger.textContent = "Menu";
  }
  if(burger && menu){
    burger.addEventListener("click", function(e){
      e.stopPropagation();
      var open = menu.hidden;
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.textContent = open ? "Close" : "Menu";
    });
    $$("a", menu).forEach(function(a){ a.addEventListener("click", closeMenu); });
    document.addEventListener("click", function(e){
      if(!menu.hidden && !menu.contains(e.target) && e.target !== burger) closeMenu();
    });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeMenu(); });
  }

  // ---------- Highlight current page ----------
  try{
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$("a[href]").forEach(function(a){
      var href = (a.getAttribute("href")||"").toLowerCase();
      var base = href.split("#")[0];
      if(base && base === file && href.indexOf("#") === -1){
        a.classList.add("active");
        a.setAttribute("aria-current","page");
      }
    });
  }catch(e){}

  // ---------- Reveal on scroll ----------
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  },{threshold:.12, rootMargin:"0px 0px -5% 0px"}) : null;
  $$("[data-reveal]").forEach(function(el){
    var group = el.closest("[data-stagger]");
    if(group){
      var idx = $$("[data-reveal]", group).indexOf(el);
      if(idx > -1) el.style.transitionDelay = Math.min(idx,8)*70 + "ms";
    }
    if(io) io.observe(el); else el.classList.add("in");
  });

  // ---------- Scroll-driven: progress bar, header fade, section rail, back-to-top ----------
  var progress = $("#progress"),
      heroHead = $(".hero-head"),
      hero = $("#hero"),
      sectionNav = $("#sectionNav"),
      toTop = $("#toTop"),
      ticking = false;

  function onScroll(){
    var y = window.pageYOffset || document.documentElement.scrollTop;

    // Reading progress bar
    if(progress){
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y/max,1) : 0) + ")";
    }

    // Hero header fades away with the hero (as in the reference)
    if(heroHead && hero){
      var hh = hero.offsetHeight * 0.75;
      var p = hh ? Math.min(y/hh,1) : 0;
      if(y > 10){ heroHead.style.opacity = String(1-p); heroHead.style.visibility = p >= 1 ? "hidden" : "visible"; }
      else { heroHead.style.opacity = ""; heroHead.style.visibility = ""; }
    }

    // Back to top
    if(toTop) toTop.classList.toggle("show", y > 600);

    // Section rail: highlight the section nearest 45% of the viewport
    if(sectionNav){
      var links = $$("a", sectionNav), best = null, bestD = Infinity,
          anchor = window.innerHeight * 0.45;
      links.forEach(function(a){
        var sec = document.getElementById(a.getAttribute("href").slice(1));
        if(!sec) return;
        var r = sec.getBoundingClientRect();
        if(r.bottom < 0 || r.top > window.innerHeight) return;
        var d = Math.abs(r.top + r.height/2 - anchor);
        if(d < bestD){ bestD = d; best = a; }
      });
      links.forEach(function(a){ a.classList.toggle("active", a === best); });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function(){
    if(!ticking){ ticking = true; window.requestAnimationFrame(onScroll); }
  }, {passive:true});
  window.addEventListener("resize", onScroll, {passive:true});
  onScroll();

  if(toTop){
    toTop.addEventListener("click", function(){
      window.scrollTo({top:0, behavior: reduced ? "auto" : "smooth"});
    });
  }

  // ---------- Giant closer heading: per-letter hover (reference pattern) ----------
  $$("[data-split]").forEach(function(el){
    if(el.querySelector(".ltr")) return;
    var text = el.textContent, frag = document.createDocumentFragment();
    text.split("").forEach(function(ch){
      var s = document.createElement("span");
      s.className = "ltr";
      s.textContent = ch === " " ? "\u00a0" : ch;
      frag.appendChild(s);
    });
    el.textContent = "";
    el.appendChild(frag);
  });

  // ---------- FAQ accordion ----------
  $$(".faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var open = btn.getAttribute("aria-expanded") === "true";
      $$(".faq-q").forEach(function(b){
        b.setAttribute("aria-expanded","false");
        var panel = document.getElementById(b.getAttribute("aria-controls"));
        if(panel) panel.hidden = true;
      });
      if(!open){
        btn.setAttribute("aria-expanded","true");
        var target = document.getElementById(btn.getAttribute("aria-controls"));
        if(target) target.hidden = false;
      }
    });
  });

  // ---------- Cursor spotlight (desktop pointers only) ----------
  var spot = $("#spotlight");
  if(spot && !reduced && window.matchMedia && window.matchMedia("(pointer: fine)").matches){
    var sx = -500, sy = -500, pending = false;
    window.addEventListener("mousemove", function(e){
      sx = e.clientX; sy = e.clientY;
      if(!pending){
        pending = true;
        window.requestAnimationFrame(function(){
          spot.style.left = sx + "px";
          spot.style.top = sy + "px";
          pending = false;
        });
      }
    }, {passive:true});
  }

  // ---------- Glitch band (character scramble) ----------
  var glitchWords = $$(".glitch-track [data-word]");
  if(glitchWords.length && !reduced){
    var pool = "!<>-_\\/[]{}=+*^?#";
    window.setInterval(function(){
      glitchWords.forEach(function(el){
        var base = el.getAttribute("data-word"), chars = base.split("");
        if(Math.random() < 0.35){
          var n = 1 + Math.floor(Math.random()*3);
          for(var i=0;i<n;i++){
            var idx = Math.floor(Math.random()*chars.length);
            chars[idx] = pool[Math.floor(Math.random()*pool.length)];
          }
        }
        el.textContent = chars.join("");
      });
    }, 320);
  }

  // ---------- Downloads page: empty notice ----------
  // If no .card elements exist inside #softwareList, show the empty notice.
  // To publish software later, add .card elements inside #softwareList.
  var list = $("#softwareList"), empty = $("#emptyNotice");
  if(list && empty){
    empty.style.display = list.querySelector(".card") ? "none" : "block";
  }

  // ---------- Coach Dashboard: pinned to v1.0.9 in download.html; the API
  // upgrades the button automatically when a newer release ships. ----------
  try{
    var dl = $("#coachDl"), ver = $("#coachVer"), fsize = $("#coachSize");
    if(dl && typeof fetch === "function"){
      fetch("https://api.github.com/repos/aawishkarpandit-source/coach-dashboard/releases/latest").then(function(r){
        if(!r.ok) throw 0; return r.json();
      }).then(function(rel){
        var exe = (rel.assets||[]).filter(function(a){ return /\.exe$/i.test(a.name); })[0];
        if(!exe) return;
        dl.href = exe.browser_download_url;
        if(ver && rel.tag_name) ver.textContent = rel.tag_name;
        if(fsize && exe.size) fsize.textContent = "~" + (exe.size/1048576).toFixed(1) + " MB";
      }).catch(function(){});
    }
  }catch(e){}
})();
