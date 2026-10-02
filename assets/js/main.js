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

  function toast(msg){
    var t = $("#toast"); if(!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove("show"); }, 2600);
  }

  // Downloads page: if no software cards have been added yet, show the empty notice.
  // To publish software later, just add .card elements inside #softwareList.
  var list = $("#softwareList"), empty = $("#emptyNotice");
  if(list && empty){
    empty.style.display = list.querySelector(".card") ? "none" : "block";
  }

  // Contact / notify forms
  $$("form[data-contact]").forEach(function(f){
    f.addEventListener("submit", function(ev){
      ev.preventDefault();
      toast("Thank you. We will contact you soon.");
      f.reset();
    });
  });
})();
