import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

const CYAN = 0x5ad7ff;
const ORANGE = 0xffc371;
const CORAL = 0xff5f6d;
const PURPLE = 0x7b61ff;

function std(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.1, ...opts });
}

function glow(color, intensity = 0.6) {
  return std(color, { emissive: color, emissiveIntensity: intensity });
}

function textTexture(lines, bg = "#0b0b10") {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 128;
  const g = c.getContext("2d");
  g.fillStyle = bg;
  g.fillRect(0, 0, 256, 128);
  lines.forEach((l) => {
    g.fillStyle = l.color || "#fff";
    g.font = `${l.bold ? "700 " : ""}${l.size || 28}px Space Grotesk, Arial, sans-serif`;
    g.fillText(l.text, l.x, l.y);
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function ribbon(points, halfHeight, material) {
  const pos = [];
  const idx = [];
  points.forEach((p) => pos.push(p.x, p.y - halfHeight, p.z, p.x, p.y + halfHeight, p.z));
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    const b = ((i + 1) % n) * 2;
    idx.push(a, a + 1, b, a + 1, b + 1, b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

function tube(points, radius, material) {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 64, radius, 8, false), material);
}

export function initViewer(container, listEl, { reduceMotion = false } = {}) {
  const width = () => container.clientWidth;
  const height = () => container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width() / height(), 0.1, 50);
  camera.position.set(5.0, 1.0, 8.8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width(), height());
  container.append(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(width(), height());
  labelRenderer.domElement.className = "v3-labels";
  container.append(labelRenderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  /* Licht hängt an der Kamera, damit jede Seite beleuchtet ist */
  const headlight = new THREE.DirectionalLight(0xffffff, 1.4);
  headlight.position.set(0.5, 0.8, 1);
  camera.add(headlight);
  scene.add(camera);
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(CYAN, 18, 12);
  rim.position.set(-3, 1.5, -2);
  scene.add(rim);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.enableDamping = true;
  controls.autoRotate = !reduceMotion;
  controls.autoRotateSpeed = 1.1;
  controls.minPolarAngle = 0.5;
  controls.maxPolarAngle = 2.2;
  controls.target.set(0, -1.3, 0);

  const model = new THREE.Group();
  scene.add(model);

  /* Kopf */
  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), std(0x4a4a58, { roughness: 0.9 }));
  head.scale.set(0.7, 1.0, 0.9);
  model.add(head);

  /* Helm: Das Brillenband läuft darüber */
  const helmet = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(1, 56, 36, 0, Math.PI * 2, 0, Math.PI * 0.64),
    std(0xf4f6fa, { roughness: 0.35, metalness: 0, emissive: 0x5f6f88, emissiveIntensity: 0.25, side: THREE.DoubleSide })
  );
  shell.scale.set(1.08, 1.22, 1.2);
  helmet.add(shell);
  /* farbiger Streifen von vorn nach hinten über die Mitte */
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(1, 0.035, 12, 64, Math.PI), glow(CORAL, 0.35));
  stripe.rotation.y = Math.PI / 2;
  stripe.scale.set(1.2, 1.24, 1.1);
  helmet.add(stripe);
  /* Ohrenpolster */
  [-1, 1].forEach((side) => {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.12, 24), std(0x2a2a33, { roughness: 0.8 }));
    ear.rotation.z = Math.PI / 2;
    ear.position.set(side * 1.04, -0.05, 0.05);
    helmet.add(ear);
  });
  /* Lüftungsschlitze oben */
  [-0.32, 0, 0.32].forEach((x) => {
    const z = -0.25;
    const y = 1.22 * Math.sqrt(1 - (x / 1.08) ** 2 - (z / 1.2) ** 2);
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.03, 0.42), std(0x2a2a33));
    vent.position.set(x, y, z);
    vent.rotation.x = 0.2;
    helmet.add(vent);
  });
  /* Schirm über der Brille */
  const peak = new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.04, 0.32, 2, 0.02), std(0xf4f6fa, { roughness: 0.4 }));
  peak.position.set(0, 0.7, 1.3);
  peak.rotation.x = -0.2;
  helmet.add(peak);
  model.add(helmet);

  /* Brillenband */
  const strapPts = [];
  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    strapPts.push(new THREE.Vector3(1.16 * Math.sin(a), 0.1, 1.29 * Math.cos(a)));
  }
  model.add(ribbon(strapPts, 0.17, std(0x1c1c25, { side: THREE.DoubleSide, roughness: 0.8 })));

  /* Brille: Mittelteil und zwei Flügel */
  const frameMat = std(0x15151d, { roughness: 0.4 });
  const lensMat = std(0xff8a50, { transparent: true, opacity: 0.75, roughness: 0.2, emissive: 0xff7a45, emissiveIntensity: 0.3 });

  const goggles = new THREE.Group();
  goggles.position.set(0, 0.18, 1.3);
  goggles.scale.setScalar(0.75);
  model.add(goggles);

  const center = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.78, 0.42, 4, 0.14), frameMat);
  goggles.add(center);
  const centerLens = new THREE.Mesh(new RoundedBoxGeometry(1.4, 0.66, 0.06, 4, 0.03), lensMat);
  centerLens.position.z = 0.22;
  goggles.add(centerLens);

  function wing(side) {
    const w = new THREE.Group();
    const theta = 0.62 * side;
    w.rotation.y = theta;
    w.position.set(side * 0.98, 0, -0.22);
    w.add(new THREE.Mesh(new RoundedBoxGeometry(0.58, 0.74, 0.34, 4, 0.12), frameMat));
    const l = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.64, 0.05, 4, 0.02), lensMat);
    l.position.z = 0.19;
    w.add(l);
    goggles.add(w);
    return w;
  }
  const wingL = wing(-1);
  const wingR = wing(1);

  /* Tasten links (Modus) und rechts (Lied) */
  const btnLeft = new THREE.Group();
  [0.17, -0.1].forEach((y) => {
    const b = new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.2, 0.1, 3, 0.03), glow(CYAN, 0.5));
    b.position.set(-0.34, y, 0);
    btnLeft.add(b);
  });
  wingL.add(btnLeft);

  const btnRight = new THREE.Group();
  [0.17, -0.1].forEach((y) => {
    const b = new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.2, 0.1, 3, 0.03), glow(ORANGE, 0.5));
    b.position.set(0.34, y, 0);
    btnRight.add(b);
  });
  wingR.add(btnRight);

  /* Mikrofon am Nasensteg */
  const mic = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), glow(CYAN, 0.9));
  mic.position.set(0, -0.2, 0.22);
  goggles.add(mic);

  /* Kompass oben auf dem Rahmen */
  const compass = new THREE.Mesh(new RoundedBoxGeometry(0.16, 0.05, 0.16, 2, 0.015), glow(PURPLE, 0.6));
  compass.position.set(0.5, 0.41, 0.02);
  goggles.add(compass);

  /* Display unten rechts im Glas */
  const display = new THREE.Group();
  display.position.set(0.45, -0.14, 0.27);
  const dScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.17),
    new THREE.MeshBasicMaterial({
      map: textTexture([
        { text: "Max", x: 128, y: 52, size: 34, bold: true },
        { text: "120 m", x: 128, y: 92, size: 28, color: "#8d8b94" },
        { text: "↗", x: 40, y: 82, size: 64, color: "#5ad7ff" },
      ]),
    })
  );
  dScreen.position.z = 0.016;
  const dBody = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.21, 0.03, 2, 0.01), glow(CYAN, 0.4));
  display.add(dBody, dScreen);
  goggles.add(display);

  /* Board am rechten Schlaf */
  const board = new THREE.Group();
  const boardAngle = 1.08;
  const bx = 1.16 * Math.sin(boardAngle) + 0.13;
  const bz = 1.29 * Math.cos(boardAngle);
  board.position.set(bx, 0.1, bz);
  board.rotation.y = Math.atan2(Math.sin(boardAngle) / (1.16 * 1.16), Math.cos(boardAngle) / (1.29 * 1.29));
  const pcb = new THREE.Mesh(new RoundedBoxGeometry(0.74, 0.34, 0.07, 2, 0.015), std(0x101018, { roughness: 0.5 }));
  board.add(pcb);
  const edge = new THREE.LineSegments(new THREE.EdgesGeometry(pcb.geometry), new THREE.LineBasicMaterial({ color: CYAN }));
  board.add(edge);
  const tft = new THREE.Mesh(
    new THREE.PlaneGeometry(0.26, 0.14),
    new THREE.MeshBasicMaterial({
      map: textTexture([
        { text: "Peak Link", x: 16, y: 50, size: 30, bold: true, color: "#5ad7ff" },
        { text: "4 online", x: 16, y: 92, size: 26, color: "#fff" },
      ]),
    })
  );
  tft.position.set(-0.1, 0, 0.037);
  board.add(tft);
  const gnss = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.025), std(0xe9f4ff));
  gnss.position.set(0.22, 0, 0.05);
  board.add(gnss);
  const antenna = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.55, 10), std(0x15151d));
  stick.position.y = 0.275;
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), glow(CYAN, 0.9));
  tip.position.y = 0.55;
  antenna.add(stick, tip);
  antenna.position.set(-0.3, 0.17, 0.03);
  antenna.rotation.z = 0.15;
  board.add(antenna);
  board.scale.setScalar(0.85);
  model.add(board);

  /* Körper: Hals und Jacke (durchsichtig, damit man die Innentasche sieht) */
  const body = new THREE.Group();
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.8, 24), std(0x4a4a58));
  neck.position.set(0, -1.5, 0);
  const jacketMat = std(0x3b4f7a, { transparent: true, opacity: 0.55, roughness: 0.7, depthWrite: false, emissive: 0x6f8fd0, emissiveIntensity: 0 });
  const torso = new THREE.Mesh(new RoundedBoxGeometry(4.0, 1.9, 1.9, 4, 0.3), jacketMat);
  torso.position.set(0, -2.85, 0);
  torso.userData = { noScale: true, base: 0 };
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.16, 12, 32), std(0x3b4f7a));
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, -1.9, 0);
  body.add(neck, torso, collar);
  model.add(body);

  /* Akku in der Innentasche der Jacke */
  const battery = new THREE.Group();
  battery.position.set(0.55, -2.45, 0.5);
  battery.add(new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.32, 0.12, 3, 0.03), std(ORANGE, { roughness: 0.4 })));
  battery.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.64, 0.46, 0.2)), new THREE.LineBasicMaterial({ color: ORANGE })));
  model.add(battery);

  /* Kabel Board -> Hals -> unter den Kragen -> Innentasche */
  const cable = tube(
    [
      new THREE.Vector3(bx - 0.05, 0.0, bz - 0.05),
      new THREE.Vector3(1.05, -0.7, 0.35),
      new THREE.Vector3(0.62, -1.45, 0.25),
      new THREE.Vector3(0.5, -1.9, 0.4),
      new THREE.Vector3(0.55, -2.3, 0.5),
    ],
    0.014,
    glow(ORANGE, 0.8)
  );
  cable.userData = { noScale: true, base: 0.8 };
  model.add(cable);

  /* Magnetischer Abreißstecker */
  const plug = new THREE.Group();
  plug.position.set(0.62, -1.45, 0.25);
  const half1 = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.06, 16), glow(0xe9f4ff, 0.5));
  const half2 = half1.clone();
  half1.position.y = 0.045;
  half2.position.y = -0.045;
  plug.add(half1, half2);
  model.add(plug);

  /* Kabel Board -> Display (außen am rechten Flügel) */
  const dc = tube(
    [
      new THREE.Vector3(bx - 0.05, 0.18, bz + 0.1),
      new THREE.Vector3(1.12, 0.1, 1.1),
      new THREE.Vector3(0.95, -0.1, 1.42),
      new THREE.Vector3(0.62, -0.12, 1.58),
      new THREE.Vector3(0.45, 0.0, 1.55),
    ],
    0.012,
    glow(CYAN, 0.7)
  );
  dc.userData = { noScale: true, base: 0.7 };
  model.add(dc);

  /* Labels und Teile */
  const parts = {};
  function register(id, text, color, objs, anchorObj, anchorPos) {
    const el = document.createElement("div");
    el.className = "v3-label";
    el.style.setProperty("--c", color);
    el.textContent = text;
    const lab = new CSS2DObject(el);
    lab.position.copy(anchorPos);
    anchorObj.add(lab);
    parts[id] = { objs: Array.isArray(objs) ? objs : [objs], el, lab, text, color, active: false };
  }
  const hex = (c) => "#" + c.toString(16).padStart(6, "0");

  register("board", "Board + Display (TFT)", hex(CYAN), board, board, new THREE.Vector3(0.1, -0.28, 0.1));
  register("antenne", "LoRa-Antenne", hex(CYAN), antenna, antenna, new THREE.Vector3(0.12, 0.64, 0));
  register("display", "OLED unten rechts", hex(CYAN), [display, dc], display, new THREE.Vector3(0.0, -0.25, 0.1));
  register("tasten-l", "Tasten links: Modus", hex(CYAN), btnLeft, btnLeft, new THREE.Vector3(-0.3, 0.38, 0));
  register("tasten-r", "Tasten rechts: Lied", hex(ORANGE), btnRight, btnRight, new THREE.Vector3(0.3, 0.38, 0));
  register("mikro", "Mikrofon", hex(CYAN), mic, mic, new THREE.Vector3(0, -0.14, 0.05));
  register("kompass", "Kompass", hex(PURPLE), compass, compass, new THREE.Vector3(0, 0.17, 0));
  register("helm", "Helm", "#dfe5ee", helmet, helmet, new THREE.Vector3(0, 1.42, 0));
  register("akku", "Akku in der Jackentasche", hex(ORANGE), battery, battery, new THREE.Vector3(0, 0.38, 0));
  register("kabel", "Kabel am Hals", hex(ORANGE), cable, cable, new THREE.Vector3(0.95, -0.95, 0.3));
  register("stecker", "Abreißstecker (Magnet)", hex(0xe9f4ff), plug, plug, new THREE.Vector3(0.45, 0.17, 0));
  register("jacke", "Jacke", hex(0x6f8fd0), torso, torso, new THREE.Vector3(-0.9, 0.7, 0.4));

  /* Liste zum Hervorheben */
  let activeId = null;
  function setActive(id) {
    activeId = activeId === id ? null : id;
    Object.entries(parts).forEach(([k, p]) => {
      p.active = k === activeId;
      p.el.classList.toggle("is-active", p.active);
      p.el.classList.toggle("is-dim", activeId && !p.active);
    });
    listEl.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b.dataset.id === activeId));
  }
  const names = {
    board: "Board mit Funk, GPS, Display",
    antenne: "LoRa-Antenne",
    display: "OLED-Display unten rechts",
    "tasten-l": "2 Tasten links: Modi",
    "tasten-r": "2 Tasten rechts: Lied vor/zurück",
    mikro: "Mikrofon",
    kompass: "Kompass",
    helm: "Helm (Band läuft darüber)",
    akku: "Akku in der Jacken-Innentasche",
    kabel: "Kabel am Hals unter den Kragen",
    stecker: "Magnetischer Abreißstecker",
    jacke: "Jacke",
  };
  Object.keys(names).forEach((id) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.id = id;
    b.textContent = names[id];
    b.style.setProperty("--c", parts[id].color);
    b.addEventListener("click", () => setActive(id));
    li.append(b);
    listEl.append(li);
  });

  /* Rendern nur, wenn sichtbar */
  let visible = true;
  new IntersectionObserver((e) => (visible = e[0].isIntersecting)).observe(container);

  new ResizeObserver(() => {
    camera.aspect = width() / height();
    camera.updateProjectionMatrix();
    renderer.setSize(width(), height());
    labelRenderer.setSize(width(), height());
  }).observe(container);

  const worldPos = new THREE.Vector3();
  const one = new THREE.Vector3();
  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const t = performance.now() / 1000;
    const headDist = camera.position.distanceTo(controls.target);
    Object.values(parts).forEach((p) => {
      const s = p.active ? 1.25 + Math.sin(t * 5) * 0.05 : 1;
      p.objs.forEach((o) => {
        if (o.userData.noScale) {
          o.material.emissiveIntensity = p.active ? 1.6 + Math.sin(t * 5) * 0.4 : o.userData.base;
        } else {
          o.scale.lerp(one.set(s, s, s), 0.2);
        }
      });
    });
    Object.values(parts).forEach((p) => {
      p.lab.getWorldPosition(worldPos);
      const behind = camera.position.distanceTo(worldPos) > headDist + 0.8;
      p.el.classList.toggle("is-hidden", behind && !p.active);
    });
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }
  tick();
}
