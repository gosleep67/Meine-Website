import "./style.css";
import "./hub.css";
import { initFx } from "./fx.js";

const bg = initFx("hub");

// Die Farbgrenze im Hintergrund wandert mit der Karte, über der die Maus ist
if (bg) {
  const split = { brille: 0.6, schmuck: 0.4 };
  document.querySelectorAll(".card").forEach((card) => {
    const to = card.classList.contains("card--brille") ? split.brille : split.schmuck;
    card.addEventListener("pointerenter", () => (bg.splitTo = to));
    card.addEventListener("pointerleave", () => (bg.splitTo = 0.5));
  });
}
