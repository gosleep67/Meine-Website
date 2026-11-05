import "./style.css";
import "./hub.css";
import { products } from "./products.js";

const eur = (n) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const grid = document.getElementById("produkte");
const filter = document.getElementById("filter");

const specs = [
  ["Gewicht", "gewicht"],
  ["Länge", "laenge"],
  ["Breite", "breite"],
  ["Material", "material"],
  ["Set", "set"],
  ["Farbe", "farbe"],
  ["Farben", "farben"],
  ["Steine", "steine"],
  ["Motiv", "motiv"],
  ["Verschluss", "verschluss"],
];

function render(kat) {
  grid.replaceChildren(
    ...products
      .filter((p) => kat === "Alle" || p.kategorie === kat)
      .map((p) => {
        const el = document.createElement("article");
        el.className = "prod";
        const img = document.createElement("img");
        img.src = p.bild;
        img.alt = p.name;
        img.loading = "lazy";
        const body = document.createElement("div");
        body.className = "prod__body";
        const head = document.createElement("div");
        head.className = "prod__head";
        const h3 = document.createElement("h3");
        h3.textContent = p.name;
        const price = document.createElement("b");
        price.textContent = eur(p.preis);
        head.append(h3, price);
        const dl = document.createElement("dl");
        specs.forEach(([label, key]) => {
          if (!p[key]) return;
          const dt = document.createElement("dt");
          dt.textContent = label;
          const dd = document.createElement("dd");
          dd.textContent = p[key];
          dl.append(dt, dd);
        });
        body.append(head, dl);
        el.append(img, body);
        return el;
      })
  );
}

const kategorien = ["Alle", ...new Set(products.map((p) => p.kategorie))];
kategorien.forEach((k, i) => {
  const b = document.createElement("button");
  b.textContent = k;
  b.className = i === 0 ? "chip is-on" : "chip";
  b.addEventListener("click", () => {
    filter.querySelectorAll(".chip").forEach((c) => c.classList.toggle("is-on", c === b));
    render(k);
  });
  filter.append(b);
});
render("Alle");
