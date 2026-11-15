// Wave field: a receding grid of points that rolls like water. One shader, no textures.
// Mounted on any element with [data-scene="sky" | "night"]. three.js is loaded lazily.
const THEMES = {
  // low = troughs, mid = the body of the field (amber), high = crests, spark = twinkles
  sky:   { low: 0x0b1626, mid: 0xffb547, high: 0xffcb7a, spark: 0xffffff, opacity: 1,   additive: false },
  night: { low: 0x4a8db8, mid: 0xffb547, high: 0xffcb7a, spark: 0xf4faff, opacity: 0.8, additive: true },
  // Home hero: the night field, pitched down and swollen so the hills climb above the name.
  hero:  { low: 0x4a8db8, mid: 0xffb547, high: 0xffcb7a, spark: 0xf4faff, opacity: 0.8, additive: true, look: -3.2, amp: 1.35, far: 57 },
} as const;

const hosts = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hosts.length) import('three').then((THREE) => hosts.forEach((host) => mount(THREE, host))).catch(() => {});

function mount(THREE: typeof import('three'), host: HTMLElement) {
  const theme: { low: number; mid: number; high: number; spark: number; opacity: number; additive: boolean; look?: number; amp?: number; far?: number } =
    THEMES[(host.dataset.scene as keyof typeof THEMES) ?? 'sky'] ?? THEMES.sky;
  const look = theme.look ?? 0.4;
  const canvas = document.createElement('canvas');
  canvas.className = 'scene';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);

  let renderer: import('three').WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);

  const COLS = 760, ROWS = 340, GAP = 0.17; // ~258k points, built once; resizing never rebuilds them
  const pos = new Float32Array(COLS * ROWS * 3);
  const seed = new Float32Array(COLS * ROWS);
  let i = 0;
  for (let z = 0; z < ROWS; z++) for (let x = 0; x < COLS; x++, i++) {
    pos[i * 3] = (x - COLS / 2) * GAP;
    pos[i * 3 + 1] = 0;
    pos[i * 3 + 2] = -z * GAP;
    seed[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    blending: theme.additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    uniforms: {
      uTime: { value: 0 }, uSize: { value: 1 }, uOpacity: { value: theme.opacity },
      uLow: { value: new THREE.Color(theme.low) }, uMid: { value: new THREE.Color(theme.mid) }, uHigh: { value: new THREE.Color(theme.high) },
      uHalf: { value: (COLS / 2) * GAP }, uAmp: { value: theme.amp ?? 1 }, uFar: { value: theme.far ?? 50 },
      uSpark: { value: new THREE.Color(theme.spark) }, uPointer: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: /* glsl */ `
      uniform float uTime, uSize, uHalf, uAmp, uFar; uniform vec2 uPointer; attribute float aSeed;
      varying float vH, vFade, vSeed, vNear;
      void main() {
        vec3 p = position;
        float t = uTime;
        float w = sin(p.x * .32 + t * .55) * .7 + sin(p.z * .41 + t * .38) * .7
                + sin((p.x + p.z) * .17 + t * .22) * 1.25
                + sin(length(p.xz - vec2(uPointer.x * 18., -16.)) * .6 - t * 1.2) * .35;
        w *= uAmp;
        p.y += w;
        vH = w; vSeed = aSeed;
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        float d = -mv.z;
        vFade = smoothstep(uFar, 5., d) * smoothstep(.5, 3., d) * smoothstep(uHalf, uHalf * .8, abs(position.x));
        vNear = smoothstep(40., 4., d);
        gl_PointSize = uSize * (.8 + aSeed * .7) * (26. / d);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uLow, uMid, uHigh, uSpark; uniform float uOpacity, uTime;
      varying float vH, vFade, vSeed, vNear;
      void main() {
        vec2 c = gl_PointCoord - .5;
        float a = smoothstep(.5, .32, length(c));
        float h = smoothstep(-1.6, 2.1, vH);
        vec3 col = mix(uLow, uMid, smoothstep(.08, .38, h));   // only the deepest troughs keep the low colour
        col = mix(col, uHigh, smoothstep(.6, 1., h));           // crests go hot
        col = mix(uMid, col, .3 + vNear * .7);                  // atmospheric perspective: far rows settle to amber
        float tw = step(.97, vSeed) * (.6 + .4 * sin(uTime * 2. + vSeed * 90.));
        col = mix(col, uSpark, tw * .8);
        gl_FragColor = vec4(col, a * vFade * uOpacity * (.5 + vNear * .3 + tw * .4 + smoothstep(.45, 1., h) * .3));
      }`,
  });
  scene.add(new THREE.Points(geo, mat));

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => {
    pointer.tx = (e.clientX / innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / innerHeight) * 2 - 1;
  }, { passive: true });

  const t0 = performance.now();
  const render = () => {
    const t = reduced ? 0 : (performance.now() - t0) / 1000;
    const r = host.getBoundingClientRect();
    const scroll = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
    camera.position.set(pointer.x * 2.2, 4.2 - pointer.y * 0.8 + scroll * 5, 7 - scroll * 3);
    camera.lookAt(pointer.x * 0.8, look + scroll * 2, -16);
    mat.uniforms.uTime.value = t;
    (mat.uniforms.uPointer.value as import('three').Vector2).set(pointer.x, pointer.y);
    renderer.render(scene, camera);
  };

  // Resizing the drawing buffer clears it, and ResizeObserver runs after rAF, so the frame
  // would be presented blank. Redraw in the same callback: the field never drops out.
  const size = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    mat.uniforms.uSize.value = Math.max(1, h / 520) * renderer.getPixelRatio();
    render();
  };
  new ResizeObserver(size).observe(host); size();

  let visible = true, lost = false, raf = 0;
  const frame = () => {
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    render();
    if (visible && !lost && !reduced) raf = requestAnimationFrame(frame);
  };
  const start = () => { cancelAnimationFrame(raf); if (visible && !lost) raf = requestAnimationFrame(frame); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }).observe(host);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; cancelAnimationFrame(raf); });
  canvas.addEventListener('webglcontextrestored', () => { lost = false; size(); start(); });
  canvas.classList.add('on');
}
