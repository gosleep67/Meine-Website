/* Gemeinsame Effekte für alle drei Seiten:
   Höhenlinien-Hintergrund (WebGL), Lichtkegel auf Karten, Neigung, Seitenwechsel. */

const PALETTES = {
  peak: [[0.35, 0.84, 1.0], [0.48, 0.38, 1.0]],
  gold: [[0.93, 0.72, 0.31], [0.82, 0.36, 0.5]],
};

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uSplit;
uniform vec3 uA, uB, uC, uD;
out vec4 o;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.3, 9.1); a *= .5; }
  return v;
}
float contour(float v) {
  float w = fwidth(v);
  return 1. - smoothstep(w * .5, w * 1.5, abs(fract(v) - .5));
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  float d = distance(uv, uMouse / uRes.y);
  float near = exp(-d * d * 7.);
  vec2 q = uv * 1.5 - vec2(0., uScroll) + vec2(uTime * .012, uTime * .008);
  float h = fbm(q) + near * .16;

  float minor = contour(h * 20.);
  float major = contour(h * 4.);
  float lines = minor * (.07 + near * .3) + major * (.2 + near * .45);

  float k = smoothstep(uSplit - .16, uSplit + .16, gl_FragCoord.x / uRes.x);
  float g = smoothstep(.3, .75, h);
  vec3 tint = mix(mix(uA, uB, g), mix(uC, uD, g), k);

  vec3 bg = vec3(.027, .031, .047);
  vec3 col = bg + tint * (lines + pow(h, 3.) * .1 + near * .035);
  col *= 1. - .35 * smoothstep(.4, 1.3, distance(gl_FragCoord.xy / uRes, vec2(.5)));
  o = vec4(col, 1.);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

function initContours(theme, reduceMotion) {
  const canvas = document.createElement("canvas");
  canvas.className = "fx-bg";
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = Object.fromEntries(
    ["uRes", "uTime", "uMouse", "uScroll", "uSplit", "uA", "uB", "uC", "uD"].map((n) => [n, gl.getUniformLocation(prog, n)])
  );

  // Auf der Auswahlseite: links Eisblau (Brille), rechts Gold (Schmuck). Sonst eine Farbwelt.
  const left = theme === "gold" ? PALETTES.gold : PALETTES.peak;
  const right = theme === "hub" ? PALETTES.gold : left;
  gl.uniform3fv(u.uA, left[0]);
  gl.uniform3fv(u.uB, left[1]);
  gl.uniform3fv(u.uC, right[0]);
  gl.uniform3fv(u.uD, right[1]);

  document.body.prepend(canvas);
  document.documentElement.classList.add("has-fx");

  const state = { split: theme === "hub" ? 0.5 : 2, splitTo: theme === "hub" ? 0.5 : 2 };
  const mouse = { x: innerWidth * 0.7, y: innerHeight * 0.35, tx: innerWidth * 0.7, ty: innerHeight * 0.35 };
  let dpr = 1;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.uRes, canvas.width, canvas.height);
  }

  function draw(t) {
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;
    state.split += (state.splitTo - state.split) * 0.05;
    gl.uniform1f(u.uTime, t / 1000);
    gl.uniform2f(u.uMouse, mouse.x * dpr, (innerHeight - mouse.y) * dpr);
    gl.uniform1f(u.uScroll, (scrollY / innerHeight) * 0.35);
    gl.uniform1f(u.uSplit, state.split);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  resize();
  addEventListener("resize", () => {
    resize();
    if (reduceMotion) draw(0);
  });
  addEventListener("pointermove", (e) => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
  });

  if (reduceMotion) {
    draw(0);
  } else {
    const loop = (t) => {
      if (!document.hidden) draw(t);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  return state;
}

/* Lichtkegel: Karten bekommen die Mausposition als CSS-Variablen */
const SPOT = ".feat, .place, .compare article, .steps li, .oled, .about__card, .diagram, .prod, .card, .table, .pain li, .checks li";
/* Neigung in 3D */
const TILT = ".hero__frame, .prod";

function initPointer() {
  let tilted = null;
  addEventListener("pointermove", (e) => {
    const spot = e.target.closest?.(SPOT);
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
      spot.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    const tilt = e.target.closest?.(TILT);
    if (tilted && tilted !== tilt) {
      tilted.style.setProperty("--rx", "0deg");
      tilted.style.setProperty("--ry", "0deg");
    }
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
      tilt.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
    }
    tilted = tilt;
  });
}

/* Seitenwechsel: ein Kreis wächst vom Klickpunkt aus, dann wird geladen */
function initVeil(reduceMotion) {
  if (reduceMotion) return;
  const veil = document.createElement("div");
  veil.className = "veil";
  document.body.append(veil);
  addEventListener("pageshow", () => veil.classList.remove("is-on"));

  document.addEventListener("click", (e) => {
    const a = e.target.closest?.("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault();
    veil.style.setProperty("--vx", `${e.clientX}px`);
    veil.style.setProperty("--vy", `${e.clientY}px`);
    veil.classList.toggle("veil--gold", url.pathname.includes("schmuck"));
    veil.classList.add("is-on");
    setTimeout(() => (location.href = url.href), 520);
  });
}

/* Einblenden beim Scrollen für Seiten ohne GSAP */
function initReveal(reduceMotion) {
  const els = document.querySelectorAll("[data-io]");
  if (!els.length) return;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

export function initFx(theme) {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bg = initContours(theme, reduceMotion);
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) initPointer();
  initVeil(reduceMotion);
  initReveal(reduceMotion);
  return bg;
}
