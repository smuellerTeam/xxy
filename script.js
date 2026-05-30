document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.interactive-unicorn').forEach((unicorn) => {
    unicorn.addEventListener('click', () => {
      unicorn.classList.toggle('reverse');
    });
    unicorn.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        unicorn.classList.toggle('reverse');
      }
    });
  });
});
