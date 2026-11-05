import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* Smooth scroll, synchronised with ScrollTrigger */
const lenis = new Lenis({ lerp: 0.1 });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target);
  })
);

/* Helpers */
function splitChars(el) {
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const chars = [];
  text.split(" ").forEach((word, i, all) => {
    const w = document.createElement("span");
    w.className = "word";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach((ch) => {
      const c = document.createElement("span");
      c.className = "char";
      c.textContent = ch;
      w.append(c);
      chars.push(c);
    });
    el.append(w);
    if (i < all.length - 1) el.append(document.createTextNode(" "));
  });
  return chars;
}

function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute("aria-label", el.textContent.trim());
  el.textContent = "";
  return words.map((w) => {
    const s = document.createElement("span");
    s.className = "w";
    s.setAttribute("aria-hidden", "true");
    s.textContent = w + " ";
    el.append(s);
    return s;
  });
}

/* Loader -> hero intro */
function intro() {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  tl.to("#loader", { yPercent: -100, duration: 1, ease: "power4.inOut" })
    .from(".line__inner", { yPercent: 110, duration: 1.2, stagger: 0.12 }, "-=0.4")
    .from("[data-hero-fade]", { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.9")
    .from(".nav", { y: -40, opacity: 0, duration: 0.8 }, "-=0.8");
  return tl;
}

const counter = { v: 0 };
const loaderNum = document.getElementById("loader-num");
const loaderBar = document.getElementById("loader-bar");
gsap.to(counter, {
  v: 100,
  duration: reduceMotion ? 0.1 : 1.8,
  ease: "power2.inOut",
  onUpdate() {
    const v = Math.round(counter.v);
    loaderNum.textContent = v;
    loaderBar.style.width = v + "%";
  },
  onComplete() {
    intro().eventCallback("onComplete", () => document.getElementById("loader").remove());
  },
});

/* 3D-Ansicht: erst laden, wenn sie in die Nähe kommt */
const stage = document.getElementById("viewer3d");
if (stage) {
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      import("./viewer3d.js")
        .then((m) => m.initViewer(stage, document.getElementById("viewer3d-list"), { reduceMotion }))
        .catch(() => (stage.textContent = "3D-Ansicht konnte nicht geladen werden."));
    },
    { rootMargin: "400px" }
  );
  io.observe(stage);
}

/* Scroll progress bar */
gsap.to("#progress", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
});

/* Custom cursor, magnetic elements */
if (finePointer) {
  const cursor = document.getElementById("cursor");
  const label = document.getElementById("cursor-label");
  const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      label.textContent = el.dataset.cursor;
      cursor.classList.add("is-label");
      gsap.to(cursor, { width: 90, height: 90, margin: "-45px 0 0 -45px", duration: 0.4, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-label");
      gsap.to(cursor, { width: 14, height: 14, margin: "-7px 0 0 -7px", duration: 0.4, ease: "power3.out" });
    });
  });

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - (r.left + r.width / 2)) * 0.35);
      my((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener("mouseleave", () => {
      mx(0);
      my(0);
    });
  });
}

if (!reduceMotion) {
  /* Hero parallax */
  gsap.to(".hero__blob--1", { yPercent: 40, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__blob--2", { yPercent: -40, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__title", { yPercent: -15, opacity: 0.2, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  /* Marquee, speeds up with scroll direction */
  const track = document.querySelector(".marquee__track");
  const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 25, repeat: -1 });
  ScrollTrigger.create({
    onUpdate(self) {
      gsap.to(loop, { timeScale: self.direction * (1 + Math.abs(self.getVelocity()) / 400), duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: self.direction, delay: 0.3, duration: 1, overwrite: false });
    },
  });

  /* Section tags */
  gsap.utils.toArray("[data-reveal]").forEach((el) =>
    gsap.from(el, { y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 90%" } })
  );

  /* About: words light up while scrolling */
  const words = splitWords(document.getElementById("lead-text"));
  gsap.to(words, {
    opacity: 1,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: { trigger: "#lead-text", start: "top 80%", end: "bottom 45%", scrub: true },
  });

  /* Split headings */
  document.querySelectorAll("[data-split]").forEach((el) => {
    const chars = splitChars(el);
    gsap.from(chars, {
      yPercent: 110,
      rotate: 8,
      opacity: 0,
      stagger: 0.02,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

} else {
  document.querySelectorAll(".lead .w, #lead-text").forEach((el) => (el.style.opacity = 1));
}
