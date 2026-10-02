// Celta Group Digital — simple business site JS (no frameworks)
(function(){
  "use strict";
  function $(s,c){ return (c||document).querySelector(s); }
  function $$(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }

  $$("[data-year]").forEach(function(el){ el.textContent = String(new Date().getFullYear()); });

  var burger = $("#hamburger"), links = $("#navLinks");
  if(burger && links){ burger.addEventListener("click", function(){ links.classList.toggle("open"); }); }
  if(links){ $$("a", links).forEach(function(a){ a.addEventListener("click", function(){ links.classList.remove("open"); }); }); }

  // Highlight current page
  try{
    var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$("#navLinks a").forEach(function(a){
      var href = (a.getAttribute("href")||"").toLowerCase();
      a.classList.toggle("active", href === file);
    });
  }catch(e){}

  // Reveal on scroll
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
  },{threshold:.12}) : null;
  $$(".reveal").forEach(function(el){ if(io) io.observe(el); else el.classList.add("in"); });

  // Downloads page: if no software cards have been added yet, show the empty notice.
  // To publish software later, just add .card elements inside #softwareList.
  var list = $("#softwareList"), empty = $("#emptyNotice");
  if(list && empty){
    empty.style.display = list.querySelector(".card") ? "none" : "block";
  }

  // Coach Dashboard: pinned to v1.0.9 in download.html; the API upgrades
  // the button automatically when a newer release ships.
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
