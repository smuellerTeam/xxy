const pages = [
  // Page 1: blackout and adjusting eyes
  `<svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seite 1">
    <defs>
      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#000" />
        <stop offset="35%" stop-color="#021021" />
        <stop offset="100%" stop-color="#04203a" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g1)" />
    <g opacity="0.0">
      <circle cx="400" cy="200" r="140" fill="#eaf6ff" opacity="0.06">
        <animate attributeName="opacity" values="0;0.06;0" dur="6s" repeatCount="indefinite" />
      </circle>
    </g>
    <g transform="translate(80,700)">
      <rect x="0" y="0" width="640" height="260" rx="10" fill="#071726" opacity="0.6" />
      <text x="32" y="80" fill="#a7c9e6" font-family="Georgia, serif" font-size="20"> </text>
    </g>
  </svg>`,

  // Page 2: milky-blue shimmer on cave walls, light beam
  `<svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seite 2">
    <defs>
      <radialGradient id="cave" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#bcdff6" stop-opacity="0.06"/>
        <stop offset="60%" stop-color="#06303f" stop-opacity="0.95"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="#03131a" />
    <ellipse cx="400" cy="520" rx="420" ry="200" fill="url(#cave)"/>
    <g>
      <path d="M200 120 C 360 80, 440 80, 600 120 L 620 140 L 180 140 Z" fill="#bfe6ff" opacity="0.06">
        <animate attributeName="opacity" values="0;0.06;0" dur="5s" repeatCount="indefinite" />
      </path>
    </g>
    <g>
      <rect x="360" y="80" width="80" height="620" fill="#cfeeff" opacity="0.12" transform="skewX(-6)" />
    </g>
  </svg>`,

  // Page 3: water pool, woman silhouette at edge (non-graphic)
  `<svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seite 3">
    <rect width="100%" height="100%" fill="#021423" />
    <defs>
      <linearGradient id="water" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#9fd7ff" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#04263a" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <ellipse cx="400" cy="660" rx="320" ry="160" fill="url(#water)" />
    <!-- woman as elegant silhouette with flowing hair -->
    <g transform="translate(260,420)">
      <path d="M70 240 C 20 180, 40 100, 70 60 C 110 20, 160 10, 200 40" stroke="#bde6ff" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.9"/>
      <path d="M120 40 C 130 90, 120 140, 90 190" stroke="#bde6ff" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.95"/>
      <circle cx="115" cy="60" r="18" fill="#cfeeff" opacity="0.95" />
      <path d="M100 220 C 130 260, 190 260, 210 220" stroke="#bfe6ff" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.9"/>
    </g>
    <!-- dripping water hints -->
    <g fill="#cfeeff" opacity="0.5">
      <circle cx="360" cy="780" r="4"><animate attributeName="cy" values="780;820;780" dur="2.2s" repeatCount="indefinite"/></circle>
      <circle cx="420" cy="760" r="3"><animate attributeName="cy" values="760;800;760" dur="2.6s" repeatCount="indefinite"/></circle>
    </g>
  </svg>`,

  // Page 4: the beautiful horse emerging (stylized, non-graphic)
  `<svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seite 4">
    <rect width="100%" height="100%" fill="#042033" />
    <g transform="translate(120,280) scale(0.9)">
      <path d="M240 280 C 200 260, 150 250, 120 220 C 80 180, 60 130, 80 100 C 110 60, 170 60, 230 90" fill="#eaf6ff" opacity="0.06"/>
      <!-- stylized horse head -->
      <path d="M420 320 C 380 260, 320 220, 260 220 C 230 220, 200 230, 180 250" stroke="#f2fbff" stroke-width="10" fill="#dff6ff" stroke-linecap="round"/>
      <path d="M300 170 C 330 130, 380 120, 420 140" stroke="#f7ffff" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M360 210 C 380 200, 420 210, 450 240" stroke="#f7ffff" stroke-width="8" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`,

  // Page 5: reveal - siren transforms into shadowy creature (stylized, implied)
  `<svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seite 5">
    <rect width="100%" height="100%" fill="#05131a" />
    <!-- upper: beautiful woman, lower: shadow tendrils -->
    <g transform="translate(220,340)">
      <path d="M80 40 C 90 10, 140 0, 180 20" stroke="#bfe6ff" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.9"/>
      <circle cx="160" cy="60" r="20" fill="#cfeeff" opacity="0.95" />
      <!-- shadow tendrils -->
      <path d="M120 210 C 110 240, 90 280, 70 320" stroke="#000" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
      <path d="M190 220 C 200 250, 230 290, 260 330" stroke="#000" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
      <rect x="40" y="180" width="220" height="90" fill="url(#shadowgrad)" opacity="0.07" />
    </g>
    <defs>
      <linearGradient id="shadowgrad" x1="0" x2="0">
        <stop offset="0%" stop-color="#000" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>`,

  // Page 6: climax - struggle, inky tether implied (non-graphic)
  `<svg viewBox="0 0 800 1100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Seite 6">
    <rect width="100%" height="100%" fill="#02080b" />
    <g>
      <ellipse cx="400" cy="700" rx="320" ry="160" fill="#062a33" opacity="0.9"/>
      <path d="M340 540 C 360 560, 410 560, 430 540" stroke="#081b1f" stroke-width="18" stroke-linecap="round" fill="none" opacity="0.9"/>
      <!-- inky tendril reaching -->
      <path d="M420 560 C 460 580, 480 620, 500 680" stroke="#0b0b0b" stroke-width="20" stroke-linecap="round"/>
      <circle cx="500" cy="680" r="18" fill="#000"/>
    </g>
  </svg>`
];

function createPageElement(svgString, index, total) {
  const wrapper = document.createElement('div');
  wrapper.className = 'page';
  wrapper.innerHTML = svgString;
  wrapper.dataset.page = index + 1;
  wrapper.dataset.total = total;
  return wrapper;
}

document.addEventListener('DOMContentLoaded', () => {
  const spread = document.getElementById('spread');
  const total = pages.length;
  let idx = 0;

  function render() {
    spread.innerHTML = '';
    const leftIndex = Math.max(0, idx - 1);
    const rightIndex = idx;
    const left = createPageElement(pages[leftIndex] || pages[0], leftIndex, total);
    const right = createPageElement(pages[rightIndex], rightIndex, total);
    left.classList.toggle('left', true);
    right.classList.toggle('right', true);
    spread.appendChild(left);
    spread.appendChild(right);
  }

  function next() {
    if (idx < total - 1) idx++;
    render();
  }
  function prev() {
    if (idx > 0) idx--;
    render();
  }

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // initial
  render();
});
