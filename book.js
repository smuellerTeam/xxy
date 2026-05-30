// Use external images for each book page (internet-hosted placeholders).
const pages = [
  'https://source.unsplash.com/800x1100/?cave,dark',
  'https://source.unsplash.com/800x1100/?cave,light',
  'https://source.unsplash.com/800x1100/?water,pool',
  'https://source.unsplash.com/800x1100/?white,horse',
  'https://source.unsplash.com/800x1100/?mermaid,shadow',
  'https://source.unsplash.com/800x1100/?dark,ink,tentacle'
];

function createPageElement(src, index, total) {
  const wrapper = document.createElement('div');
  wrapper.className = 'page';
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Seite ${index + 1}`;
  img.width = 800;
  img.height = 1100;
  wrapper.appendChild(img);
  wrapper.dataset.page = index + 1;
  wrapper.dataset.total = total;
  return wrapper;
}

document.addEventListener('DOMContentLoaded', () => {
  const spread = document.getElementById('spread');
  const total = pages.length;
  let idx = 1; // show first spread as pages 1 (left) and 2 (right)

  function render() {
    spread.innerHTML = '';
    const leftIndex = Math.max(0, idx - 1);
    const rightIndex = Math.min(total - 1, idx);
    const left = createPageElement(pages[leftIndex] || pages[0], leftIndex, total);
    const right = createPageElement(pages[rightIndex] || pages[0], rightIndex, total);
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
    if (idx > 1) idx--;
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
